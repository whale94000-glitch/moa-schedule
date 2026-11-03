# AISC - 회원 관리 시스템 (Member Management)

Supabase 클라우드 데이터베이스와 React + Vite 기반으로 구축된 회원 등록 및 실시간 목록 관리 애플리케이션입니다.

## 기능
- **회원 등록**: 이름, 이메일, 전화번호 입력 및 데이터 유효성 검증
- **실시간 목록 조회**: Supabase DB (`public.members`)에서 등록된 회원 목록 동기화
- **반응형 UI**: 모바일 및 데스크톱 환경에 최적화된 인터페이스

## 기술 스택
- **Frontend**: React 19, Vite, Lucide React
- **Backend / Database**: Supabase (PostgreSQL, Row Level Security 적용)

## 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 Supabase 프로젝트의 URL과 Anon Key를 입력합니다.
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 프로덕션 빌드
```bash
npm run build
```
빌드된 파일은 `dist/` 폴더에 생성됩니다.

