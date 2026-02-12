import axios from "axios";
import type { ApiResponse, LoginRequest, LoginResponse } from "./Logintype";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";





export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 세션 or refresh cookie 유지
  validateStatus: (s) => s >= 200 && s < 500,
});






/**
 * =========================
 * 1) 로그인
 * POST /users/login
 * =========================
 */
export async function fetchMemberLoginApi(
  req: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const res = await apiClient.post<ApiResponse<LoginResponse>>("/users/login", req);

  return res.data;
}


/**
 * =========================
 * 2) 내 정보 조회
 * GET /users/me
 * =========================
 */
export type AuthMeResponse = {loginId: string;authenticationId?: number | null;};
export async function meApi(): Promise<ApiResponse<AuthMeResponse>> {
  const res = await apiClient.get<ApiResponse<AuthMeResponse>>("/users/me");
  return res.data;
}


/**
 * =========================
 * 3) 로그아웃
 * POST /users/logout
 * =========================
 */
export async function logoutApi(): Promise<ApiResponse<null> | { status: number }> {
  const res = await apiClient.post("/users/logout");

  const data = res.data as ApiResponse<null>;
  if (data && typeof data === "object" && "success" in data) {
    return data;
  }

  return { status: res.status };
}

/**
 * =========================
 * 4) 토큰 재발급 (JWT 쓰는 경우)
 * POST /users/refresh
 * =========================
 */
export type RefreshResponse = {
  accessToken: string;
};

export async function refreshApi(): Promise<ApiResponse<RefreshResponse>> {
  const res = await apiClient.post<ApiResponse<RefreshResponse>>(
    "/users/refresh"
  );
  return res.data;
}


















// import axios, { } from "axios";
// import { ApiResponse, LoginRequest, LoginResponse, } from "./Logintype";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // "/api"


// export const apiClient = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
//   validateStatus: (s) => s >= 200 && s < 500,
// });

// //타입은 응답용


// //API 함수 ----------------------------------------------------
// // ----------------------
// // 로그인 조회
// // ----------------------
// export const fetchMemberLoginApi = async (
// req: LoginRequest
// ): Promise<ApiResponse<LoginResponse>> => {
// const res = await apiClient.post<ApiResponse<LoginResponse>>(
//   "/users/login", req
// );
// return res.data;

// };


// // export async function meApi(): Promise<ApiResponse<AuthMeResponse>> {
// //   const res = await fetch(`/users/me`, {
// //     method: "GET",
// //     credentials: "include",
// //   });
// //   return res.json();
// // }
