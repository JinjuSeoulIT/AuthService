import axios from "axios";
import type { ApiResponse } from "./Logintype";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}
export function getAccessToken() {
  return accessToken;
}

/** 일반 API */
export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

/** refresh 전용 (인터셉터 없음) */
const refreshClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

async function refreshApiDirect(): Promise<ApiResponse<{ accessToken: string }>> {
  const res = await refreshClient.post<ApiResponse<{ accessToken: string }>>(
    "/users/refresh"
  );
  return res.data;
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshWaitQueue: Array<(token: string | null) => void> = [];

function notifyRefreshWaiters(token: string | null) {
  refreshWaitQueue.forEach((cb) => cb(token));
  refreshWaitQueue = [];
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as any;
    const status = error?.response?.status;

    if (status !== 401) throw error;
    if (original?._retry) throw error;
    if (original?.url?.includes("/users/refresh")) throw error;

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshWaitQueue.push((token) => {
          if (!token) return reject(error);
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshed = await refreshApiDirect();
      if (!refreshed.success) {
        setAccessToken(null);
        notifyRefreshWaiters(null);
        throw error;
      }

      const newToken = refreshed.data.accessToken;
      setAccessToken(newToken);
      notifyRefreshWaiters(newToken);

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } finally {
      isRefreshing = false;
    }
  }
);