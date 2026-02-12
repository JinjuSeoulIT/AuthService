import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import MemberReducer from "@/components/features/member/MemberSlice";
import onboardingReducer from "@/components/features/onboarding/OnboardingSlict";
import LoginReducer from "@/components/features/login/LoginSlict";
import rootSaga from "@/app/rootSaga";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
   
    member: MemberReducer,  //ID/PW관리
    login: LoginReducer,    //로그인 관리 (토큰)
    onboarding: onboardingReducer,   


    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
