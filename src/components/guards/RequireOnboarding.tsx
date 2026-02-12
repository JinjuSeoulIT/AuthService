"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOnboardingStatusRequest } from "@/components/features/onboarding/OnboardingSlict";

type Props = {
  children: ReactNode;
  redirectTo?: string;
};

export default function RequireOnboarding({
  children,
  redirectTo = "/member/onboarding",
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, hasAuthentication, error } = useAppSelector((s) => s.onboarding);

  useEffect(() => {
    dispatch(fetchOnboardingStatusRequest());
  }, [dispatch]);

  useEffect(() => {
    if (loading) return;
    if (error) return;

    if (!hasAuthentication) {
      router.replace(redirectTo); // ✅ 내부 라우팅 (IP 필요없음)
    }
  }, [loading, hasAuthentication, error, redirectTo, router]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>온보딩 상태 확인 실패: {error}</div>;
  if (!hasAuthentication) return null;

  return <>{children}</>;
}