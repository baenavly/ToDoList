# 🥔 PotaTodo (Vanilla JavaScript)

이 프로젝트는 **Vanilla JavaScript만 사용하여 구현한 개인화 Todo List 애플리케이션**입니다.
브라우저의 `localStorage`를 SSOT(단일 데이터 저장소)로 사용하여, 새로고침 이후에도 사용자 이름과 Todo 상태가 유지됩니다.

---

## 🔗 배포 / 실행 방법

* 별도의 빌드 과정 없이 `index.html` 파일을 브라우저에서 열면 바로 실행됩니다.

---

## 🛠 기술 스택

* **HTML5**: 화면 구조 정의
* **CSS3**: 레이아웃 및 UI 스타일링
* **JavaScript (Vanilla)**: 로직 및 상태 관리
* **localStorage**: 데이터 영속성 관리

---

## ✨ 주요 기능

### 1. 사용자 이름 등록

* 최초 접속 시 이름을 입력받아 `localStorage`에 저장
* 저장된 이름이 있을 경우 입력 UI를 숨기고 인삿말 표시

### 2. Todo 관리

* Todo 추가
* Todo 완료 / 미완료 체크
* Todo 클릭 시 수정 가능 (완료 상태에서는 수정 불가)
* Enter 키 입력 지원

### 3. 데이터 유지

* 모든 Todo 데이터는 `localStorage`에 저장
* 페이지 새로고침 후에도 상태 유지

### 4. 정렬 규칙

* 미완료 Todo가 상단에 위치
* 동일 상태 내에서는 최신 순 정렬

---

## 📂 프로젝트 구조

```
📦 vanilla
 ┣ 📜 index.html      # HTML 구조
 ┣ 📜 style.css       # 스타일 정의
 ┣ 📜 script.js       # 애플리케이션 로직
 ┗ 📂 images          # 체크박스 이미지 리소스
```

---

## 🧠 동작 원리 (렌더링 흐름)

### 1️⃣ 초기 로딩

* 브라우저가 `index.html`을 로드하여 기본 DOM 구조 생성
* CSS 적용 후 `script.js` 실행

### 2️⃣ 초기 화면 결정

* `showGreeting()` 실행

  * `localStorage`에 이름이 있는지 확인
  * 이름 존재 시: 인삿말 표시 + Todo 영역 노출
  * 이름 미존재 시: 이름 입력 UI 유지

* `renderTodos()` 실행

  * 저장된 Todo 목록을 불러와 화면에 렌더링

### 3️⃣ 상태 기반 렌더링

* DOM 대신 **localStorage에 저장된 데이터**를 단일 기준으로 삼아 모든 UI를 다시 렌더링하는 방식으로 동작

```
사용자 이벤트 → 데이터 변경 → localStorage 저장 → 전체 재렌더링
```

---

## 📦 Todo 데이터 구조

```js
{
  id: Number,          // Date.now() 기반 고유 ID
  text: String,        // Todo 내용
  createdAt: Number,   // 생성 시각
  updatedAt: Number,   // 수정 시각
  completed: Boolean   // 완료 여부
}
```

---

## 🧩 주요 함수 역할

* `loadTodos()`
  → localStorage에서 Todo 목록을 불러옴

* `saveTodos(todos)`
  → Todo 배열을 localStorage에 저장

* `renderTodos()`
  → Todo 데이터를 기준으로 화면을 새로 렌더링

* `addTodo()`
  → 새로운 Todo 추가

* `handleCheckbox()`
  → Todo 완료 상태 변경 처리

* `handleTodoClick()`
  → Todo 수정 모드 진입 처리

---

## ✅ 설계 포인트

* localStorage를 **SSOT**(Single Source of Truth)로 사용
* 전역 상태 최소화
* 데이터 변경 후 항상 전체 렌더링으로 UI 동기화
* 이벤트 위임을 활용하여 불필요한 이벤트 리스너 방지

---

## 🚀 추후 확장 아이디어

* 사용자별 Todo 분리
* Todo 삭제, 상단 고정 기능
* Todo 필터링 (전체 / 완료 / 미완료)
* React 기반 리팩토링
