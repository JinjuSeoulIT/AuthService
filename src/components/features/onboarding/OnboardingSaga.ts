import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchOnboardingStatusFailure,
  fetchOnboardingStatusRequest,
  fetchOnboardingStatusSuccess,
} from "./OnboardingSlict";
import { fetchOnboardingStatusApi, OnboardingStatusRes } from "@/components/features/onboarding/OnboardingApi";
import { ApiResponse } from "../login/Logintype";




function* fetchOnboardingStatusSaga() {
  try {
    const response: ApiResponse<OnboardingStatusRes> = yield call(fetchOnboardingStatusApi);


    if (response?.success) {
      yield put(fetchOnboardingStatusSuccess(response.data));
    } else {
      yield put(fetchOnboardingStatusFailure(response?.message ?? "onboarding status failed"));
    }
  } catch (e: any) {
    yield put(fetchOnboardingStatusFailure(e?.message ?? "onboarding status error"));
  }
}

export function* onboardingRootSaga() {
  yield takeLatest(fetchOnboardingStatusRequest.type, fetchOnboardingStatusSaga);
}