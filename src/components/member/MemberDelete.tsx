"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMemberRequest } from "@/components/features/member/MemberSlice";

type Props = { userId: number };

const MemberDelete=({ userId }: Props) =>{

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.member);

  const onDelete = () => {
    if (loading) return;
    const ok = confirm("정말 탈퇴할까? (복구 불가)");
    if (!ok) return;
    dispatch(deleteMemberRequest());
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>회원 삭제(탈퇴)</h2>

      <button onClick={onDelete} disabled={loading}>
        {loading ? "삭제 중..." : "탈퇴하기"}
      </button>

      {error && <p style={{ color: "crimson" }}>에러: {error}</p>}
    </div>
  );
}

export default MemberDelete;