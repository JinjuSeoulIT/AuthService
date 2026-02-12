"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginRequest, resetAuthFlags } from "@/components/features/login/LoginSlict";
import type { LoginRequest } from "../features/login/Logintype";

import styles from "../UserLogin/login.module.css";

const initialState: LoginRequest = { loginId: "", password: "" };


// ✅ 3000 → 3001 이동 주소는 여기서만 결정 (통합 포인트)

export default function UserLogin() {
  const dispatch = useAppDispatch();
  const { loginLoading, loginDone, loginError } = useAppSelector((state) => state.login);

  const [form, setForm] = useState<LoginRequest>(initialState);
  const [showPw, setShowPw] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginRequest({
        loginId: form.loginId.trim(),
        password: form.password.trim(),
      })
    );
  };





const EMPLOYEE_FRONT =
  process.env.NEXT_PUBLIC_EMPLOYEE_FRONT_BASE_URL ?? "http://192.168.1.58:3001";

  // ✅ 로그인 성공하면 "무조건" 3001로 이동 (여기서 끝)
  useEffect(() => {
    if (!loginDone) return;
    window.location.href = EMPLOYEE_FRONT;

      dispatch(resetAuthFlags());     // (선택) 펄스 끄기
  }, [loginDone]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };












  return (
    <div className={styles.stage}>
      <div className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.fireGlow} />
      <div className={styles.embers}>
        {Array.from({ length: 24 }).map((_, idx) => (
          <span
            key={idx}
            className={styles.ember}
            style={{ ["--i" as any]: idx + 1 }}
          />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.frame} />

        <header className={styles.header}>
          <p className={styles.kicker}>WELCOME</p>
          <h1 className={styles.title}>SIGN IN</h1>
          <p className={styles.sub}>
            계정으로 로그인하세요.{" "}
            <span className={styles.subDim}>세션 유지/쿠키 설정 확인</span>
          </p>
        </header>

        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label} htmlFor="loginId">
            <span className={styles.labelText}>LOGIN ID</span>
            <input
              id="loginId"
              name="loginId"
              className={styles.input}
              value={form.loginId}
              onChange={onChange}
              placeholder="아이디 입력"
              autoComplete="username"
            />
          </label>

          <label className={styles.label} htmlFor="password">
            <span className={styles.labelText}>PASSWORD</span>
            <div className={styles.pwRow}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                className={styles.input}
                value={form.password}
                onChange={onChange}
                placeholder="비밀번호 입력"
                autoComplete="current-password"
              />

              <button
                type="button"
                className={styles.pwToggle}
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPw ? "HIDE" : "SHOW"}
              </button>
            </div>
          </label>

          { loginError && (
            <p style={{ margin: 0, color: "rgba(255,120,120,.9)" }}>
              {String( loginError)}
            </p>
          )}


          <button className={styles.button} type="submit" disabled={loginLoading}>
            {loginLoading? "로그인 중..." : "로그인"}
          </button>

          <div className={styles.footerRow}>
            <a className={styles.link} href="/member/create">
              회원가입
            </a>
            <span className={styles.dot}>·</span>
            <a className={styles.link} href="/member/find-password">
              비밀번호 찾기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}