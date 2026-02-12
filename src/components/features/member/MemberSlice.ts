
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemberCreateRequestType, MemberCreateResponse } from './Membertype';


export interface MemberState {
  

  MemberCreate: MemberCreateResponse | null; //크레이트는 초기값 널

  loading: boolean;
  error: string | null;
  lastReq: any | null; // 마지막 요청 payload (디버깅용)
}

const initialState: MemberState = {

  MemberCreate: null,

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
    createMemberRequest(state, action: PayloadAction<MemberCreateRequestType>) {
      state.loading = true;
      state.error = null;
      state.lastReq = action.payload;
    },

    createMemberSuccess(state,action: PayloadAction<MemberCreateResponse> //“UI 상태 시작 신호”**
    ) {
      state.loading = false;
      state.MemberCreate = action.payload;
    },

    createMemberFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

  //   // ─────────────────────────
  //   // 비밀번호 변경
  //   // ─────────────────────────
  //   updatePasswordRequest(
  //     state,
  //     action: PayloadAction<PasswordUpdateRequest>
  //   ) {
  //     state.loading = true;
  //     state.error = null;
  //     state.lastReq = action.payload;
  //   },

  //   updatePasswordSuccess(state) {
  //     state.loading = false;
  //   },

  //   updatePasswordFailure(state, action: PayloadAction<string>) {
  //     state.loading = false;
  //     state.error = action.payload;
  //   },

  //   // ─────────────────────────
  //   // 회원 삭제
  //   // ─────────────────────────
  //   deleteMemberRequest(state) {
  //     state.loading = true;
  //     state.error = null;
  //   },

  //   deleteMemberSuccess(state) {
  //     state.loading = false;
  //     state.user = null;
  //   },

  //   deleteMemberFailure(state, action: PayloadAction<string>) {
  //     state.loading = false;
  //     state.error = action.payload;
  //   },

    // ─────────────────────────
    // 초기화 //이전 에러가 초기셋팅
    // ─────────────────────────
    clearMemberState(state) {
      state.MemberCreate = null;
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

  // updatePasswordRequest,
  // updatePasswordSuccess,
  // updatePasswordFailure,

  // deleteMemberRequest,
  // deleteMemberSuccess,
  // deleteMemberFailure,

  clearMemberState,
} = memberSlice.actions;

export default memberSlice.reducer;