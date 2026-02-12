import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, all } from "redux-saga/effects";

import type { ApiResponse, LoginRequest, LoginResponse } from "./Logintype";
// import { loginFail, loginRequest, loginSuccess } from "./LoginSlict";

import { fetchMemberLoginApi } from "./LoginApi";
import { loginFailure, loginRequest, loginSuccess } from "./LoginSlict";
import { setAccessToken } from "./TokenApi";

//토큰은 클라이언트 메모리(변수)에만 잠깐 들고 있고

// 필요할 때만(요청할 때, 401일 때) 자동으로 갱신/교체되게 만든다



// import { meRequest, meSuccess, meFail } from "../login/LoginSlict"; // 네가 me slice를 따로 만들었다는 가정

// ✅ 1) 로그인만 담당
function* loginSaga(action: PayloadAction<LoginRequest>) {
  try {
    const res: ApiResponse<LoginResponse> = yield call(fetchMemberLoginApi, action.payload);

    if (res.success) {
      // ✅ 1) accessToken 저장 (LoginResponse에 accessToken 포함되어 있어야 함)
      setAccessToken(res.data.accessToken);

        // ✅ 2) 응답 상태 저장
      yield put(loginSuccess(res.data)); // 로그인 응답만 저장
    } else {
      yield put(loginFailure(res.message));
    }
  } catch (error: unknown) {
    yield put(loginFailure("로그인 연결실패 500"));
  }
}

// ✅ 2) me만 담당 (필요할 때만 호출)


// function* meSaga() {
//   try {
//     const meRes: ApiResponse<AuthMeResponse> = yield call(meApi);

//     if (meRes.success) {
//       const me = meRes.data;
//       yield put(meSuccess({
//         userId: me.userId,
//         loginId: me.loginId,
//         authenticationId: me.authenticationId ?? null,
//       }));
//     } else {
//       yield put(meFail(meRes.message || "내 정보 조회 실패"));
//     }
//   } catch (error: unknown) {
//     yield put(meFail("내 정보 연결실패 500"));
//   }
// }

export function* watchLoginSaga() {
  yield all([
    takeLatest(loginRequest.type, loginSaga),
    // takeLatest(meRequest.type, meSaga),
  ]);
}




// import { PayloadAction } from "@reduxjs/toolkit";
// import { ApiResponse,   LoginRequest, LoginResponse } from "./Logintype";
// import { LoginFailure, LoginInputRequest, LoginSuccess, } from "./LoginSlict";
// import { call, put, takeLatest,all} from "redux-saga/effects";
// import { fetchMemberLoginApi,  } from "./LoginApi";






// function* LoginSaga( action: PayloadAction<LoginRequest> ) {
//     try{                                                 //액션 페이로드 타입 지정( 로그인 입력용 )
//     const response:ApiResponse<LoginResponse> = yield call(fetchMemberLoginApi, action.payload); // API호출용                                                              //응답타입 지정 (로그인 응답용 )

//     if (response.success) {
//     yield put(LoginSuccess(response.data));        //성공이면 data
//      console.log(response.data) // 콘솔확인용 (테스트)
//     }else{
//         yield put(LoginFailure(response.message)); //실패면 message
//     }
//     }catch (error:any) {
//         yield put(LoginFailure("서버접속 실패"));   //앤 네트워크 /서버 에러 /예외처리
//     }
// }



// // function* meWorker() {
// //   try {
// //      const meRes: ApiResponse<AuthMeResponse> = yield call(meApi);

// //     if (!meRes.success) {
// //       yield put(meFail(meRes.message || "내 정보 조회 실패"));
// //       return;
// //     }

// //     const data = meRes.data;
// //     yield put(meSuccess({
// //       userId: data?.userId ?? null,
// //       loginId: data?.loginId ?? null,
// //       authenticationId: data?.authenticationId ?? null,
// //     }));
// //   } catch (e: any) {
// //     yield put(meFail(e?.message ?? "내 정보 조회 실패(네트워크)"));
// //   }
// // }







// export function* watchLoginSaga() {

// yield all([

// takeLatest(LoginInputRequest.type, LoginSaga),
//  //마지막 클릭만 살림

// // takeLatest(meRequest.type, meWorker),

// ]
// )
// }