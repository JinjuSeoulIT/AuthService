import { MemberCreateRequest, MemberCreateResponse, PasswordUpdateRequest } from "./MemberSlice";
import { ApiResponse } from "./Membertype";

/**
 * ✅ 프론트가 때릴 base URL
 * - 너는 rewrites로 /api/... 쓰는 걸 선호했으니 기본은 /api
 * - 환경변수 있으면 그걸 쓰고, 없으면 /api
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

/**
 * 공통 fetch 헬퍼
 * - 세션(JSESSIONID) 유지하려면 credentials: "include" 필수
 */
async function request<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });

  // 서버가 ApiResponse<T>로 내려준다고 가정
  const body = (await res.json()) as ApiResponse<T>;

  // HTTP 에러도 message로 통일해서 던지면 saga에서 처리 쉬움
  if (!res.ok || !body.success) {
    throw new Error(body?.message ?? `HTTP ${res.status}`);
  }

  return body;
}





/**
 * =========================
 * 회원가입 (ID/PW 생성)
 * POST /api/users
 * =========================
 */
export async function createMemberApi(
  payload: MemberCreateRequest
): Promise<ApiResponse<MemberCreateResponse>> {
  return request<MemberCreateResponse>(`${API_BASE}/users/login/create`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * =========================
 * 비밀번호 변경
 * PUT /api/users/password
 * - userId는 세션에서 판단(프론트가 안 보냄)
 * =========================
 */
export async function updatePasswordApi(
  payload: PasswordUpdateRequest
): Promise<ApiResponse<null>> {
  return request<null>(`${API_BASE}/users/password`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * =========================
 * 회원 삭제(탈퇴)
 * DELETE /api/users/me
 * - userId는 세션에서 판단(프론트가 안 보냄)
 * =========================
 */
export async function deleteMemberApi(): Promise<ApiResponse<null>> {
  return request<null>(`${API_BASE}/users/me`, {
    method: "DELETE",
  });
}