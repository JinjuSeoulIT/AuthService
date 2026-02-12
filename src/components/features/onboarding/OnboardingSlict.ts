import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OnboardingState = {
  loading: boolean;
  hasAuthentication: boolean;
  authenticationId: number | null;
  error: string | null;
};

const initialState: OnboardingState = {
  loading: false,
  hasAuthentication: false,
  authenticationId: null,
  error: null,
};

const onboardingSlice = createSlice({
    
  name: "onboarding",
  initialState,
  reducers: {
    fetchOnboardingStatusRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOnboardingStatusSuccess(
      state,
      action: PayloadAction<{ hasAuthentication: boolean; authenticationId: number | null }>
    ) {
      state.loading = false;
      state.hasAuthentication = action.payload.hasAuthentication;
      state.authenticationId = action.payload.authenticationId;
      state.error = null;
    },
    fetchOnboardingStatusFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.hasAuthentication = false;
      state.authenticationId = null;
    },
    // (선택) 로그아웃/세션만료 시 초기화 용도
    resetOnboardingState() {
      return initialState;
    },
  },
});

export const {
  fetchOnboardingStatusRequest,
  fetchOnboardingStatusSuccess,
  fetchOnboardingStatusFailure,
  resetOnboardingState,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;