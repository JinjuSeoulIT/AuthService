import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  createMemberRequest,
  createMemberSuccess,
  createMemberFailure,

  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,

  deleteMemberRequest,
  deleteMemberSuccess,
  deleteMemberFailure,
} from "./MemberSlice";

import {
  createMemberApi,
  updatePasswordApi,
  deleteMemberApi,
} from "./MemberApi";

/** 에러 메시지 안전 추출 */
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "알 수 없는 오류";
}

/**
 * =========================
 * 회원가입 Saga
 * =========================
 */
function* createMemberWorker(
  action: ReturnType<typeof createMemberRequest>
): SagaIterator {
  try {
    const res = yield call(createMemberApi, action.payload);
    // res.data: { userId, loginId }
    yield put(createMemberSuccess(res.data));
  } catch (err) {
    yield put(createMemberFailure(getErrorMessage(err)));
  }
}

/**
 * =========================
 * 비밀번호 변경 Saga
 * =========================
 */
function* updatePasswordWorker(
  action: ReturnType<typeof updatePasswordRequest>
): SagaIterator {
  try {
    yield call(updatePasswordApi, action.payload);
    yield put(updatePasswordSuccess());
  } catch (err) {
    yield put(updatePasswordFailure(getErrorMessage(err)));
  }
}

/**
 * =========================
 * 회원 삭제 Saga
 * =========================
 */
function* deleteMemberWorker(
  _action: ReturnType<typeof deleteMemberRequest>
): SagaIterator {
  try {
    yield call(deleteMemberApi);
    yield put(deleteMemberSuccess());
  } catch (err) {
    yield put(deleteMemberFailure(getErrorMessage(err)));
  }
}

/**
 * =========================
 * watcher
 * =========================
 */
export function* memberSaga(): SagaIterator {
  yield takeLatest(createMemberRequest.type, createMemberWorker);
  yield takeLatest(updatePasswordRequest.type, updatePasswordWorker);
  yield takeLatest(deleteMemberRequest.type, deleteMemberWorker);
}