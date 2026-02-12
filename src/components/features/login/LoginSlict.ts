



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, LoginResponse, RefreshResponseDTO } from "./Logintype";


/**
 * =========================
 * 타입
 * =========================
 */



export interface AuthState {
  // 로그인 결과(간단히)
  // ✅ 토큰 (원래는 메모리/쿠키 권장, 일단 상태로)
  // accessToken: string | null;

  // 로그인
  loginLoading: boolean;
  loginDone: boolean;  //이벤트처리 
  loginError: string | null;

  // refresh
  refreshLoading: boolean;
  refreshDone: boolean;
  refreshError: string | null;

  // logout
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string | null;


}

const initialState: AuthState = {

  // accessToken: null,

  loginLoading: false,
  loginDone: false,
  loginError: null,

  refreshLoading: false,
  refreshDone: false,
  refreshError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,


};

/**
 * =========================
 * Slice
 * =========================
 */
const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // ─────────────────────────
    // LOGIN
    // ─────────────────────────
    loginRequest(state, action: PayloadAction<LoginRequest>) {//시작
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
      
      // state.lastReq = { ...(state.lastReq ?? {}), login: action.payload }; 프론트 디버깅용 삭제
    },

    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loginLoading = false;
      state.loginDone = true;

      // // ✅ 토큰 저장
      // state.accessToken = action.payload.accessToken;

      // // ✅ 최소 유저정보 저장
      // state.user = {loginId: action.payload.loginId,
      //               authenticationId: action.payload.authenticationId ?? null,
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loginLoading = false;
      state.loginError = action.payload;

    },






// 요청 시작(Request) 에서만 기본 정리: loading/done/error 초기화

// 성공하면(done=true) UI가 반응

// UI 반응 끝나면 resetAuthFlags() 한 번으로 흔적 제거




    // ─────────────────────────
    // REFRESH
    // ─────────────────────────
    refreshRequest(state) {
      state.refreshLoading = true;
      state.refreshDone = false;
      state.refreshError = null;
    },

    refreshSuccess(state, action: PayloadAction<RefreshResponseDTO>) {
      state.refreshLoading = false;
      state.refreshDone = true;

      // // ✅ 토큰 갱신
      // state.accessToken = action.payload.accessToken;
    },

    refreshFailure(state, action: PayloadAction<string>) {
      state.refreshLoading = false;
      state.refreshError = action.payload;
       state.logoutDone = false;     // ✅
      // refresh 실패 = 사실상 인증 끊김 처리로 가는게 보통
      // state.accessToken = null;
  
    },



    // ─────────────────────────
    // LOGOUT
    // ─────────────────────────
    logoutRequest(state) {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },

    logoutSuccess(state) {
      state.logoutLoading = false;
      state.logoutDone =true;

      // // ✅ 프론트 상태 정리
      // state.accessToken = null;
    
    },

    logoutFailure(state, action: PayloadAction<string>) {
      state.logoutLoading = false;
      state.logoutError = action.payload;
       state.logoutDone = false;     // ✅
    },



    
    // ─────────────────────────
    // FLAGS RESET (UI 재진입/토스트/라우팅 후 필수)
    // ─────────────────────────
    resetAuthFlags(state) {
      state.loginDone = false;
      state.loginError = null;

      state.refreshDone = false;
      state.refreshError = null;

      state.logoutDone = false;
      state.logoutError = null;
    },

    // ─────────────────────────
    // 전체 초기화 (세션만료/강제로그아웃)
    // ─────────────────────────
    clearAuthState() {
      return initialState;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,

  refreshRequest,
  refreshSuccess,
  refreshFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  resetAuthFlags,
  clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;




























// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {  AuthMeResponse, LoginRequest, LoginResponse } from "./Logintype";

// export interface LoginState {
//   loginRes: LoginResponse | null;
//   loginReq: LoginRequest | null;

//   loading: boolean;
//   error: string | null;
//   lastReq: any | null;

//    // 최종 판단 기준(/me 결과)
//   me: AuthMeResponse | null;



// }

// const initialState: LoginState = {
//   loginRes: null,
//   loginReq: null,
//   loading: false,
//   error: null,
//   lastReq: null,



//    // 최종 판단 기준(/me 결과)
//   me:  null
// };

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     // 로그인 입력/요청
//     LoginInputRequest(state, action: PayloadAction<LoginRequest>) {
//       state.loading = true;
//       state.error = null;
//       state.lastReq = action.payload;
//       state.loginReq = action.payload; // ✅ 필요하면 같이 저장
//     },

//     // 성공
//     LoginSuccess(state, action: PayloadAction<LoginResponse>) {
//       state.loading = false;
//       state.error = null;
//       state.loginRes = action.payload;
//     },

//     // 실패
//     LoginFailure(state, action: PayloadAction<string>) {
//       state.loading = false;
//       state.error = action.payload;
//       state.loginRes = null;
//     },

//     // 로그아웃/초기화
//     logout(state) {
//       state.loginRes = null;
//       state.loginReq = null;
//       state.loading = false;
//       state.error = null;
//       state.lastReq = null;
//     },


//     // meRequest(state) {
//     //   state.loading = true;
//     //   state.error = null;
//     // },
//     // meSuccess(state, action: PayloadAction<AuthMeResponse>) {
//     //   state.loading = false;
//     //   state.me = action.payload;
//     // },
//     // meFail(state, action: PayloadAction<string>) {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     //   state.me = null;
//     // },







//   },
// });

// export const {
//   LoginInputRequest,
//   LoginSuccess,
//   LoginFailure,
//   logout,
  
//   // meRequest,
//   // meSuccess,
//   // meFail,




// } = loginSlice.actions;

// export default loginSlice.reducer;