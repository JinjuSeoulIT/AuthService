

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function IconButton({ title, sub }: { title: string; sub: string }) {
  return (
    <Link href="#" className="icon-btn card-hover">
      <span className="icon-dot" aria-hidden="true" />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 14 }}>{title}</span>
        <span style={{ fontSize: 12, color: "rgba(0,0,0,.55)", fontWeight: 800 }}>{sub}</span>
      </div>
    </Link>
  );
}

function DeptCard({ name, desc, tags }: { name: string; desc: string; tags: string[] }) {
  return (
    <div className="card card-hover dept-card">
      <div className="dept-name">{name}</div>
      <div className="dept-desc">{desc}</div>

      <div className="dept-meta">
        {tags.map((t) => (
          <span
            key={t}
            className="chip"
            style={{
              background: "rgba(11,78,162,.10)",
              border: "1px solid rgba(11,78,162,.18)",
              color: "#0b4ea2",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <Link className="btn btn-ghost" href="/doctor">
          자세히
        </Link>
      </div>
    </div>
  );
}

function PanelActionsLoggedOut() {
  const loginBase = process.env.NEXT_PUBLIC_LOGIN_FRONT_BASE_URL || "http://192.168.1.58:3000";

  return (
    <div className="panel-actions">
      <button className="btn btn-primary" style={{ flex: 1 }}>
        예약 요청
      </button>

      <a
        className="btn btn-ghost"
        style={{ flex: 1, textAlign: "center" }}
        href={`${loginBase}/member/login`}
      >
        로그인
      </a>
    </div>
  );
}

function PanelActionsLoggedIn({ displayName }: { displayName?: string }) {
  return (
    <div className="panel-actions" style={{ flexDirection: "column", gap: 10 }}>
      <div className="panel-muted" style={{ textAlign: "center" }}>
        ✅ {displayName ? `${displayName}님 ` : ""}로그인 완료
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Link className="btn btn-primary" style={{ flex: 1 }} href="/board">
          공지/게시판
        </Link>
        <Link className="btn btn-ghost" style={{ flex: 1 }} href="/staff">
          의료진/직원
        </Link>
      </div>
    </div>
  );
}

// 공통 응답 래퍼
type ApiResponse<T> = { success: boolean; message: string; data: T };

// ✅ 서버가 내려주는 “세션 + 온보딩” 결과 DTO
type SessionStatus = {
  hasAuthentication: boolean;
  authenticationId: number | null;
  realName: string | null; // ✅ 이름도 내려받기
};

export default function HomePage() {
  // null = 로딩중 / true = 로그인 / false = 비로그인
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_MEMBER_API_BASE_URL;
        if (!base) {
          setIsLoggedIn(false);
          return;
        }

        const res = await fetch(`${base}/api/session/status`, {
          method: "GET",
          credentials: "include",
        });

        // ✅ “세션 없으면 401”이 핵심
        if (res.status === 401) {
          setIsLoggedIn(false);
          setDisplayName(undefined);
          return;
        }
        if (!res.ok) {
          setIsLoggedIn(false);
          setDisplayName(undefined);
          return;
        }

        const json: ApiResponse<SessionStatus> = await res.json();

        // ✅ 로그인 여부는 “세션 OK + success”로 확정
        if (!json.success) {
          setIsLoggedIn(false);
          setDisplayName(undefined);
          return;
        }

        // 세션은 OK. (온보딩/상세정보는 부가)
        setIsLoggedIn(true);

        // ✅ 표시명
        const nm = json.data?.realName ?? undefined;
        setDisplayName(nm ?? undefined);

        // 만약 “온보딩 완료한 사람만 로그인완료”로 보여주고 싶으면:
        // setIsLoggedIn(!!json.data?.hasAuthentication);

      } catch {
        setIsLoggedIn(false);
        setDisplayName(undefined);
      }
    })();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/hospital-hero.jpg')" }} aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container container-px hero-inner">
          <div className="hero-copy">
            <span className="chip">병원 로그인 · 게시판 · 직원 조회</span>
            <h1 className="hero-title"><br /></h1>
            <p className="hero-sub">
            
            </p>



            <div className="hero-cta">
              <a className="btn btn-primary" href="#reserve">빠른 진료예약</a>
              <Link className="btn btn-ghost" href="/board">공지/게시판</Link>
              <Link className="btn btn-ghost" href="/staff">의료진/직원</Link>
            </div>

            <div className="hero-shortcuts">
              <span className="chip">응급실 24H</span>
              <span className="chip">대표번호 1577-0000</span>
              <span className="chip">진료시간 안내</span>
            </div>
          </div>

          {/* 오른쪽 패널 */}
          <aside className="hero-panel" id="reserve">
            <div className="panel-tabs">
              <div className="panel-tab active">방문예약</div>
              <div className="panel-tab">인터넷 진료상담</div>
              <div className="panel-tab">의료진 찾기</div>
            </div>

            <div className="panel-body">
              <div className="panel-title">빠른 진료예약</div>

              <div className="stack" style={{ gap: 10 }}>
                <div className="stack" style={{ gap: 6 }}>
                  <div className="label" style={{ color: "rgba(255,255,255,.82)" }}>이름</div>
                  <input className="input" placeholder="홍길동" />
                </div>

                <div className="stack" style={{ gap: 6 }}>
                  <div className="label" style={{ color: "rgba(255,255,255,.82)" }}>전화번호</div>
                  <input className="input" placeholder="010-0000-0000" />
                </div>

                <div className="stack" style={{ gap: 6 }}>
                  <div className="label" style={{ color: "rgba(255,255,255,.82)" }}>진료과</div>
                  <select className="input" defaultValue="내과">
                    {["내과", "정형외과", "피부과", "소아청소년과", "치과", "안과"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {isLoggedIn === null ? (
                  <div className="panel-actions">
                    <div className="panel-muted" style={{ textAlign: "center", width: "100%" }}>
                      로그인 상태 확인중...
                    </div>
                  </div>
                ) : isLoggedIn ? (
                  <PanelActionsLoggedIn displayName={displayName} />
                ) : (
                  <PanelActionsLoggedOut />
                )}

                <p className="panel-muted">
                  * 현재는 UI만 동작. 백엔드 연결 시 <b>예약 API</b>로 교체하면 끝.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="hero-iconbar">
          <div className="container container-px">
            <div className="iconbar-inner">
              <IconButton title="진료안내" sub="외래/입원" />
              <IconButton title="예약조회" sub="내 예약" />
              <IconButton title="검사안내" sub="준비사항" />
              <IconButton title="오시는길" sub="주차/교통" />
              <IconButton title="진료비" sub="발급/납부" />
              <IconButton title="고객센터" sub="문의/FAQ" />
            </div>
          </div>
        </div>
      </section>

      {/* 진료과 섹션 */}
      <section className="section" style={{ paddingTop: 84 }}>
        <div className="container container-px">
          <div className="section-head">
            <div>
              <div className="h2">진료과 / 클리닉</div>
              <div className="p">카드형 레이아웃 + 실제 병원 사이트 느낌으로 구성</div>
            </div>
            <Link className="btn btn-ghost" href="/staff">의료진 전체</Link>
          </div>

          <div className="grid grid-3">
            <DeptCard name="내과" desc="일반 내과, 만성질환 관리, 건강검진 연계" tags={["예약 가능", "야간진료", "검진"]} />
            <DeptCard name="정형외과" desc="관절·척추·스포츠 손상, 재활클리닉" tags={["MRI", "재활", "도수치료"]} />
            <DeptCard name="피부과" desc="레이저·여드름·피부질환, 시술 상담" tags={["피부질환", "레이저", "상담"]} />
          </div>
        </div>
      </section>
    </>
  );
}