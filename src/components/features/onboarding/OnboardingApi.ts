// OnboardingApi.ts
import { ApiResponse } from "@/components/features/onboarding/Onboardingtype";
import { apiClient } from "../login/LoginApi";


export type OnboardingStatusRes = {
  hasAuthentication: boolean;
  authenticationId: number | null;
};

// const API_BASE = "http://192.168.1.58:8880"; // ✅ 백엔드가 실제 떠있는 주소



export async function fetchOnboardingStatusApi(): Promise<ApiResponse<OnboardingStatusRes>> {
  const res = await apiClient.get<ApiResponse<OnboardingStatusRes>>("/onboarding/status");


  // ✅ 정상(2xx)
  return res.data;


}


