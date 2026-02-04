import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import MemberReducer from "@/components/features/member/MemberSlice";
import onboardingReducer from "@/components/features/onboarding/OnboardingSlict";
import Login from "@/components/features/login/LoginSlict"; 
import rootSaga from "@/app/rootSaga";



const sagaMiddleware = createSagaMiddleware();




export const appStore = configureStore({
  reducer: {

    member: MemberReducer,
    login : Login,
    //온보딩
    onboarding: onboardingReducer
  },

//   //온보딩이 ‘회원(member) 도메인의 일부’(= 회원가입/내정보/authentication 존재 여부 같은 흐름)라면
// ✅ MemberReducer 안에 같이 두는 것도 충분히 괜찮아.

// 반대로 온보딩을 여러 도메인(doctor/nurse/employee 공통)에서 재사용할 거고, 앞으로 정책이 커질 것 같으면
// ✅ onboardingSlice로 분리가 더 유지보수 좋음.


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});



sagaMiddleware.run(rootSaga);




export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;