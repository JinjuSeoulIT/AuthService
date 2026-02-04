import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePasswordRequest } from "@/components/features/member/MemberSlice";

type Props = { userId: number };

const MemberUpdate=({ userId }: Props)=> {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.member);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const canSubmit =
    oldPassword.trim().length > 0 && newPassword.trim().length > 0 && !loading;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    dispatch(
      updatePasswordRequest({
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      })
    );
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>비밀번호 변경</h2>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>기존 비밀번호</label>
          <input
            value={oldPassword}
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>새 비밀번호</label>
          <input
            value={newPassword}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={!canSubmit}>
          {loading ? "변경 중..." : "변경하기"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>에러: {error}</p>}
      <p style={{ marginTop: 8, opacity: 0.7 }}>
        * userId는 프론트에서 안 보냄(세션 기준 API로 처리하는 전제)
      </p>
    </div>
  );
}

export default MemberUpdate;