"use client";

/**
 * ✅ 로그인 전용 프로젝트(왼쪽)
 * - 홈(/)을 "메인 대시보드"가 아니라 "로그인 화면"으로 사용
 * - 오른쪽(메인 프로젝트)은 건드리지 않고,
 *   오른쪽에서 로그인 버튼 클릭 시 이 프로젝트(/)로 진입해서 바로 로그인하도록 목적
 */

import UserLogin from "@/components/UserLogin/UserLogin";

export default function HomePage() {
  return <UserLogin />;
}
