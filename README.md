# React + TypeScript + Tailwind CSS Project

Vite 기반의 빠르고 현대적인 React 개발 환경입니다.

## 🛠️ 기술 스택

- **Framework / Bundler**: [Vite](https://vite.dev/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

## 🚀 시작하기

### 1. 개발 서버 실행
```bash
npm run dev
```
로컬 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 2. 프로덕션 빌드
```bash
npm run build
```

### 3. 코드 린트 검사
```bash
npm run lint
```

### 4. 빌드 결과물 미리보기
```bash
npm run preview
```

## 📁 디렉터리 구조

```
├── public/              # 정적 파일
├── src/
│   ├── assets/          # 이미지 및 미디어 에셋
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── App.css          # 커스텀 컴포넌트 CSS
│   ├── index.css        # Tailwind CSS 진입점
│   └── main.tsx         # React DOM 렌더링 진입점
├── index.html           # HTML 템플릿
├── vite.config.ts       # Vite 설정 (Tailwind CSS v4 플러그인 포함)
├── tsconfig.json        # TypeScript 설정
└── package.json
```
