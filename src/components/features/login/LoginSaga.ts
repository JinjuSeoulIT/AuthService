import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse,   LoginRequest, LoginResponse } from "./Logintype";
import { LoginFailure, LoginInputRequest, LoginSuccess, } from "./LoginSlict";
import { call, put, takeLatest,all} from "redux-saga/effects";
import { fetchMemberLoginApi,  } from "./LoginApi";






function* LoginSaga( action: PayloadAction<LoginRequest> ) {
    try{                                                 //액션 페이로드 타입 지정( 로그인 입력용 )
    const response:ApiResponse<LoginResponse> = yield call(fetchMemberLoginApi, action.payload); // API호출용                                                              //응답타입 지정 (로그인 응답용 )

    if (response.success) {
    yield put(LoginSuccess(response.data));        //성공이면 data
     console.log(response.data) // 콘솔확인용 (테스트)
    }else{
        yield put(LoginFailure(response.message)); //실패면 message
    }
    }catch (error:any) {
        yield put(LoginFailure("서버접속 실패"));   //앤 네트워크 /서버 에러 /예외처리
    }
}



// function* meWorker() {
//   try {
//      const meRes: ApiResponse<AuthMeResponse> = yield call(meApi);

//     if (!meRes.success) {
//       yield put(meFail(meRes.message || "내 정보 조회 실패"));
//       return;
//     }

//     const data = meRes.data;
//     yield put(meSuccess({
//       userId: data?.userId ?? null,
//       loginId: data?.loginId ?? null,
//       authenticationId: data?.authenticationId ?? null,
//     }));
//   } catch (e: any) {
//     yield put(meFail(e?.message ?? "내 정보 조회 실패(네트워크)"));
//   }
// }







export function* watchLoginSaga() {

yield all([

takeLatest(LoginInputRequest.type, LoginSaga),
 //마지막 클릭만 살림

// takeLatest(meRequest.type, meWorker),

]
)
}