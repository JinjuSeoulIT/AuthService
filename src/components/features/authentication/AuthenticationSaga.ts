import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, AuthenticationRequest, AuthenticationResponse } from "./AuthenticationType";
import { createAuthenticationApi } from "./AuthenticationAPI";
import { SagaIterator } from "redux-saga";
import { createAuthenticationFail, createAuthenticationRequest, createAuthenticationSuccess } from "./AuthenticationSlict";





/* =======================
생성
======================= */
function* createAuthenticationSaga(action: PayloadAction<AuthenticationRequest>): SagaIterator {
    try {
    const res: ApiResponse<AuthenticationResponse> = yield call(createAuthenticationApi, action.payload);

    if (res.success) {
    yield put(createAuthenticationSuccess(res.data));
    } else {
    yield put(createAuthenticationFail(res.message));
    }
} catch (error: unknown) {
    yield put(createAuthenticationFail("의사 생성 연결실패 500"));
}
}


// // // 수정
// // function* updateAuthenticationSaga(action: PayloadAction<AuthenticationUpdateRequest>) {
// //   try {
// //     const response: ApiResponse<AuthenticationResponse> = yield call(
// //       updateAuthenticationApi,
// //       action.payload.authenticationId,
// //       action.payload.req
// //     );

// //     if (response.success) yield put(updateAuthenticationSuccess(response.data));
// //     else yield put(updateAuthenticationFail(response.message ?? "authentication update failed"));
// //   } catch (e: any) {
// //     yield put(updateAuthenticationFail(e?.message ?? "authentication update failed"));
// //   }
// // }

// // // 삭제
// // function* deleteAuthenticationSaga(action: PayloadAction<AuthenticationDeleteRequest>) {
// //   try {
// //     const response: ApiResponse<void> = yield call(deleteAuthenticationApi, action.payload.authenticationId);

// //     if (response.success) yield put(deleteAuthenticationSuccess());
// //     else yield put(deleteAuthenticationFail(response.message ?? "authentication delete failed"));
// //   } catch (e: any) {
// //     yield put(deleteAuthenticationFail(e?.message ?? "authentication delete failed"));
// //   }
// // }

export function* authenticationRootSaga() {
  yield all([
    takeLatest(createAuthenticationRequest.type, createAuthenticationSaga),
// //     takeEvery(updateAuthenticationRequest.type, updateAuthenticationSaga),
// //     takeEvery(deleteAuthenticationRequest.type, deleteAuthenticationSaga),
  ]);
}
