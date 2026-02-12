import axios from "axios";
import { ApiResponse, MemberCreateRequestType, MemberCreateResponse } from "./Membertype";



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";





export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 세션 or refresh cookie 유지
  validateStatus: (state) => state >= 200 && state < 500,
});





/**
 * =========================
 * 회원가입 (ID/PW 생성)
 * POST /api/users
 * =========================
 */
// ✅ 회원가입: POST /users/login/create
export async function createMemberApi(
  req: MemberCreateRequestType
): Promise<ApiResponse<MemberCreateResponse>> {
  const res = await apiClient.post<ApiResponse<MemberCreateResponse>>(
    "/users/create",
    req
  );
  return res.data;
}




// /**
//  * =========================
//  * 비밀번호 변경
//  * PUT /api/users/password
//  * - userId는 세션에서 판단(프론트가 안 보냄)
//  * =========================
//  */
// export async function updatePasswordApi(
//   payload: PasswordUpdateRequest
// ): Promise<ApiResponse<null>> {
//   return request<null>(`/api/users/password`, {
//     method: "PUT",
//     body: JSON.stringify(payload),
//   });
// }

// /**
//  * =========================
//  * 회원 삭제(탈퇴)
//  * DELETE /api/users/me
//  * - userId는 세션에서 판단(프론트가 안 보냄)
//  * =========================
//  */
// export async function deleteMemberApi(): Promise<ApiResponse<null>> {
//   return request<null>(`/api/users/me`, {
//     method: "DELETE",
//   });
// }