import { all } from "redux-saga/effects";
import { memberSaga } from "@/components/features/member/MemberSaga";
import { onboardingRootSaga } from "@/components/features/onboarding/OnboardingSaga";
import { watchLoginSaga } from "@/components/features/login/LoginSaga";


export default function* rootSaga() {
    
  yield all([
    
    
    watchLoginSaga(),

    memberSaga(),

    onboardingRootSaga()



  ]);
}