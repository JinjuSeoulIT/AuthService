import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {  AuthMeResponse, LoginRequest, LoginResponse } from "./Logintype";

export interface LoginState {
  loginRes: LoginResponse | null;
  loginReq: LoginRequest | null;

  loading: boolean;
  error: string | null;
  lastReq: any | null;

   // 최종 판단 기준(/me 결과)
  me: AuthMeResponse | null;



}

const initialState: LoginState = {
  loginRes: null,
  loginReq: null,
  loading: false,
  error: null,
  lastReq: null,



   // 최종 판단 기준(/me 결과)
  me:  null
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // 로그인 입력/요청
    LoginInputRequest(state, action: PayloadAction<LoginRequest>) {
      state.loading = true;
      state.error = null;
      state.lastReq = action.payload;
      state.loginReq = action.payload; // ✅ 필요하면 같이 저장
    },

    // 성공
    LoginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loading = false;
      state.error = null;
      state.loginRes = action.payload;
    },

    // 실패
    LoginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.loginRes = null;
    },

    // 로그아웃/초기화
    logout(state) {
      state.loginRes = null;
      state.loginReq = null;
      state.loading = false;
      state.error = null;
      state.lastReq = null;
    },


    // meRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // meSuccess(state, action: PayloadAction<AuthMeResponse>) {
    //   state.loading = false;
    //   state.me = action.payload;
    // },
    // meFail(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.me = null;
    // },







  },
});

export const {
  LoginInputRequest,
  LoginSuccess,
  LoginFailure,
  logout,
  
  // meRequest,
  // meSuccess,
  // meFail,




} = loginSlice.actions;

export default loginSlice.reducer;