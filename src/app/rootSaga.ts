import { all } from "redux-saga/effects";
// import { memberSaga } from "@/components/features/member/MemberSaga";
import { onboardingRootSaga } from "@/components/features/onboarding/OnboardingSaga";
import { watchLoginSaga } from "@/components/features/login/LoginSaga";
import { memberSaga } from "@/components/features/member/MemberSaga";



export default function* rootSaga() {
    
  yield all([
    
   





    watchLoginSaga(),  //로그인 

    memberSaga(),      //맴버 

    onboardingRootSaga()  //온보닝



  ]);
}