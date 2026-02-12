import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  createMemberRequest,
  createMemberSuccess,
  createMemberFailure,

//   updatePasswordRequest,
//   updatePasswordSuccess,
//   updatePasswordFailure,

//   deleteMemberRequest,
//   deleteMemberSuccess,
//   deleteMemberFailure,
} from "./MemberSlice";

import {
  createMemberApi,
//   updatePasswordApi,
//   deleteMemberApi,
} from "@/components/features/member/MemberApi";
import { ApiResponse, MemberCreateResponse } from "./Membertype";

// /** 에러 메시지 안전 추출 */
// function getErrorMessage(err: unknown): string {
//   if (err instanceof Error) return err.message;
//   return "알 수 없는 오류";
// }

/**
 * =========================
 * 회원가입 Saga
 * =========================
 */
function* createMemberWorker(action: ReturnType<typeof createMemberRequest>): SagaIterator {
  try {
    const res :ApiResponse<MemberCreateResponse> = yield call(createMemberApi, action.payload);
    // res.data: {  loginId }

    if(res.success){
    yield put(createMemberSuccess(res.data));

    } else {
    yield put(createMemberFailure(res.message));
    }
    } catch (error: unknown) {
    yield put(createMemberFailure("회원가입 서버에 연결할수 없습니다 500"));
    }
}






// /**
//  * =========================
//  * 비밀번호 변경 Saga
//  * =========================
//  */
// function* updatePasswordWorker(
//   action: ReturnType<typeof updatePasswordRequest>
// ): SagaIterator {
//   try {
//     yield call(updatePasswordApi, action.payload);
//     yield put(updatePasswordSuccess());
//   } catch (err) {
//     yield put(updatePasswordFailure(getErrorMessage(err)));
//   }
// }

// /**
//  * =========================
//  * 회원 삭제 Saga
//  * =========================
//  */
// function* deleteMemberWorker(
//   _action: ReturnType<typeof deleteMemberRequest>
// ): SagaIterator {
//   try {
//     yield call(deleteMemberApi);
//     yield put(deleteMemberSuccess());
//   } catch (err) {
//     yield put(deleteMemberFailure(getErrorMessage(err)));
//   }
// }

// /**
//  * =========================
//  * watcher
//  * =========================
//  */
export function* memberSaga(): SagaIterator {
  yield takeLatest(createMemberRequest.type, createMemberWorker);
//   yield takeLatest(updatePasswordRequest.type, updatePasswordWorker);
//   yield takeLatest(deleteMemberRequest.type, deleteMemberWorker);}
}