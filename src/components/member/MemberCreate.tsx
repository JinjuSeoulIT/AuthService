"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMemberRequest, clearMemberState } from "@/components/features/member/MemberSlice";

const MemberCreate= () =>{
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((s) => s.member);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = loginId.trim().length > 0 && password.trim().length > 0 && !loading;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    dispatch(
      createMemberRequest({
        loginId: loginId.trim(),
        password: password.trim(),
      })
    );
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 잔상 정리(선택)
    return () => {
      // dispatch(clearMemberState());
    };
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>회원가입 (ID/PW 생성)</h2>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Login ID</label>
          <input
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="login id"
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={!canSubmit}>
          {loading ? "생성 중..." : "회원가입"}
        </button>

        <button
          type="button"
          style={{ marginLeft: 8 }}
          onClick={() => dispatch(clearMemberState())}
        >
          초기화
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>에러: {error}</p>}

      {user && (
        <div style={{ marginTop: 12 }}>
          <p>✅ 생성 완료</p>
          <p>userId: {user.userId}</p>
          <p>loginId: {user.loginId}</p>
        </div>
      )}
    </div>
  );
}

export default MemberCreate;