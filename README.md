1) 프론트에서 이런 걸 라이브러리로 푸는 분야들

백엔드 비유로 보면:

UI 컴포넌트 (Modal/Drawer/Table/Toast)
↔ 스프링이 웹 계층 잡아주는 느낌
→ shadcn/ui, MUI, Chakra, Mantine

서버 상태/캐싱/재요청
↔ JPA/Hibernate처럼 “데이터 가져오기 표준화”
→ TanStack Query(react-query)

폼/검증
↔ Bean Validation + DTO 검증
→ React Hook Form + Zod

애니메이션
↔ (스프링엔 직접 대응은 없지만) “효과 표준화”
→ Framer Motion

지금 Redux-saga를 쓰고 있으니까,
UI 쪽(Modal/Drawer)은 shadcn/ui로 확실히 편함



2) 모달/드로어는 shadcn/ui가 최고로 편함

shadcn에서는

모달 = Dialog

드로어(오른쪽 슬라이드) = Sheet

그리고 Radix 기반이라:
✅ ESC 닫기
✅ 바깥 클릭 닫기
✅ 포커스 트랩
✅ 스크롤 락
✅ 접근성 aria
이런 거 다 자동임.


////
3) 설치 (Next.js + Tailwind 기준)

터미널에서(프로젝트 루트):

npx shadcn@latest init


그리고 필요한 컴포넌트만 추가:

npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add button
npx shadcn@latest add card




//작은창이뜨면 마우스 드레그하는법
//npm i react-draggable


npm i @radix-ui/react-visually-hidden