import axios, { } from "axios";
import { ApiResponse, LoginRequest, LoginResponse, } from "./Logintype";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // "/api"


export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  validateStatus: (s) => s >= 200 && s < 500,
});

//타입은 응답용


//API 함수 ----------------------------------------------------
// ----------------------
// 로그인 조회
// ----------------------
export const fetchMemberLoginApi = async (
req: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
const res = await apiClient.post<ApiResponse<LoginResponse>>(
  "/users/login", req
);
return res.data;

};


// export async function meApi(): Promise<ApiResponse<AuthMeResponse>> {
//   const res = await fetch(`/users/me`, {
//     method: "GET",
//     credentials: "include",
//   });
//   return res.json();
// }
