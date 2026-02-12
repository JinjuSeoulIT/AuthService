
/**
 * =========================
 * MEMBER - CREATE (회원가입)
 * =========================
 */
export type MemberCreateRequestType = {
  loginId: string;
  password: string;
};

export type MemberCreateResponse = {
  loginId: string;
};

export const initialMemberCreateForm: MemberCreateRequestType = {
  loginId: "",
  password: "",
};



/**
 * =========================
 * MEMBER - UPDATE (비밀번호 변경)
 * =========================
 * - 본인 비번 변경이면 loginId는 세션/토큰으로 식별 가능 → payload에 굳이 안 넣음
 */
export type PasswordUpdateRequest = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordUpdateResponse = {
  loginId: string;
};


export const initialPasswordUpdateForm: PasswordUpdateRequest = {
  oldPassword: "",
  newPassword: "",
};




/**
 * =========================
 * MEMBER - DELETE (회원삭제)
 * =========================
 * - 본인 탈퇴면 body 없이도 가능하지만,
 * - 네가 타입을 원하니까 loginId 기반으로 최소만 둠
 */
export type MemberDeleteRequest = {
  loginId: string;
};

export type MemberDeleteResponse = {
  deleted: boolean;
  loginId: string;
};




export type ApiResponse<T> = {
success:               boolean;
message:               string;
data:                  T;


};