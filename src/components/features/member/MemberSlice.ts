import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * ===== 요청/응답 타입 =====
 * (지금은 최소 뼈대용)
 */
export interface MemberCreateRequest {
  loginId: string;
  password: string;
}

export interface MemberCreateResponse {
  userId: number;
  loginId: string;
}

export interface PasswordUpdateRequest {
  oldPassword: string;
  newPassword: string;
}

/**
 * ===== 상태 타입 =====
 */
export interface MemberState {
  user: MemberCreateResponse | null;

  loading: boolean;
  error: string | null;

  lastReq: any | null; // 마지막 요청 payload (디버깅용)
}

const initialState: MemberState = {
  user: null,
  loading: false,
  error: null,
  lastReq: null,
};

/**
 * ===== Slice =====
 */
const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    // ─────────────────────────
    // 회원가입
    // ─────────────────────────
    createMemberRequest(state, action: PayloadAction<MemberCreateRequest>) {
      state.loading = true;
      state.error = null;
      state.lastReq = action.payload;
    },

    createMemberSuccess(
      state,
      action: PayloadAction<MemberCreateResponse>
    ) {
      state.loading = false;
      state.user = action.payload;
    },

    createMemberFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ─────────────────────────
    // 비밀번호 변경
    // ─────────────────────────
    updatePasswordRequest(
      state,
      action: PayloadAction<PasswordUpdateRequest>
    ) {
      state.loading = true;
      state.error = null;
      state.lastReq = action.payload;
    },

    updatePasswordSuccess(state) {
      state.loading = false;
    },

    updatePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ─────────────────────────
    // 회원 삭제
    // ─────────────────────────
    deleteMemberRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteMemberSuccess(state) {
      state.loading = false;
      state.user = null;
    },

    deleteMemberFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ─────────────────────────
    // 초기화
    // ─────────────────────────
    clearMemberState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.lastReq = null;
    },
  },
});

export const {
  createMemberRequest,
  createMemberSuccess,
  createMemberFailure,

  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,

  deleteMemberRequest,
  deleteMemberSuccess,
  deleteMemberFailure,

  clearMemberState,
} = memberSlice.actions;

export default memberSlice.reducer;