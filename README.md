# 🥔 PotaTodo

### Vanilla JavaScript & React(TypeScript) Todo List

PotaTodo는 **동일한 Todo List 요구사항을 두 가지 방식**으로 구현한 개인 프로젝트입니다.
Vanilla JavaScript와 React(TypeScript)를 각각 사용해 구현하면서,
**DOM 기반 구현과 상태 기반 렌더링 방식의 차이**를 비교·학습하는 것을 목표로 했습니다.

사용자 이름과 Todo 데이터는 **브라우저의 localStorage에 저장**되며,
페이지를 새로고침하더라도 입력한 이름과 Todo 상태가 유지됩니다.

---

## 🔗 실행 방법

### Vanilla JavaScript

- 별도의 빌드 과정 없이
  `/vanilla/index.html` 파일을 브라우저에서 열면 바로 실행됩니다.

### React + TypeScript

- Node.js 환경 필요

```bash
cd react
npm install
npm run dev
```

---

## 🛠 기술 스택

### 공통

- **CSS3**
- **localStorage**

### Vanilla

- **HTML5**
- **JavaScript (Vanilla)**

### React

- **React**
- **TypeScript**
- **Vite**

---

## ✨ 주요 기능 (공통)

### 1. 사용자 이름 등록

- 최초 접속 시 이름 입력
- 입력한 이름을 브라우저에 저장
- 저장된 이름이 있으면 입력 화면을 건너뛰고 인삿말 표시

### 2. Todo 관리

- Todo 추가
- Todo 완료 / 미완료 체크
- Todo 클릭 시 수정 모드 전환

  - 완료된 Todo는 수정 불가

- Enter 키를 이용한 입력 및 저장

### 3. 데이터 유지

- Todo와 사용자 이름을 localStorage에 저장
- 페이지를 새로고침해도 데이터가 사라지지 않음

### 4. 정렬 규칙

- 미완료 Todo가 상단에 표시
- 동일한 상태 내에서는 최신순 정렬

---

## 📂 프로젝트 구조

```
📦 PotaTodo
 ┣ 📂 vanilla
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 style.css
 ┃ ┣ 📜 script.js
 ┃ ┗ 📂 images
 ┃
 ┣ 📂 react
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📂 types
 ┃ ┃ ┣ 📜 App.tsx
 ┃ ┃ ┣ 📜 App.css
 ┃ ┃ ┗ 📜 main.tsx
 ┃ ┗ 📜 package.json
 ┃
 ┗ 📜 README.md
```

---

## 🧠 구현 방식 비교

### Vanilla JavaScript

- localStorage를 데이터의 기준으로 사용
- Todo 변경 시 전체 목록을 다시 렌더링
- DOM을 직접 조작하는 방식
- 이벤트 위임을 활용해 이벤트 리스너 수 최소화

렌더링 흐름:

```
사용자 이벤트
 → 데이터 변경
 → localStorage 저장
 → 전체 DOM 재렌더링
```

---

### React + TypeScript

- 컴포넌트의 state를 데이터 기준으로 사용
- localStorage는 데이터 유지를 위한 저장소로 활용
- 컴포넌트 단위로 UI 분리
- 조건부 렌더링을 통해 수정 모드 구현
- 커스텀 훅을 통해 Todo 관련 로직 분리

렌더링 흐름:

```
사용자 이벤트
 → state 변경
 → 컴포넌트 재렌더링
 → useEffect를 통한 localStorage 동기화
```

---

## 📦 Todo 데이터 구조 (공통)

```ts
{
  id: number; // Date.now() 기반 고유 ID
  text: string; // Todo 내용
  createdAt: number; // 생성 시각
  updatedAt: number; // 수정 시각
  completed: boolean; // 완료 여부
}
```

---

## 🧩 주요 설계 포인트

### Vanilla

- 데이터를 기준으로 DOM을 다시 그리는 구조
- DOM 상태를 직접 관리하지 않고 데이터 기반으로 렌더링
- 이벤트 위임을 통한 성능 고려

### React

- 상태의 소유자를 명확히 분리 (`useTodos` 커스텀 훅)
- UI 컴포넌트는 입력과 출력 역할만 담당
- Todo 생성·수정 로직을 한 곳에서 관리
- 타입을 통해 데이터 구조와 책임을 명확히 표현

---

## 🚀 추후 확장 아이디어

- 로그인 기능

  - 사용자별 Todo 분리
  - 사용자 전환 시 Todo 목록 분기

- 지난 Todo 보관하기 기능

  - 완료된 Todo를 별도 보관함으로 이동
  - 날짜별 Todo 히스토리 확인

- Todo 삭제 기능
- Todo 필터링 (전체 / 완료 / 미완료)
- 서버 API 연동
- 전역 상태 관리 라이브러리 적용 비교 (Context / Zustand 등)

---

## 📌 프로젝트 목적

> 같은 Todo List 요구사항을
> Vanilla JavaScript와 React로 각각 구현하면서
> **상태 관리 방식과 렌더링 구조의 차이를 직접 체감하고 이해하는 것**을 목표로 했습니다.
