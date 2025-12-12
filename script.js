const greeting = document.getElementById("greeting");
const nameInputArea = document.getElementById("nameInputArea");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const todoArea = document.getElementById("todoArea");

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const list = document.getElementById("todoList");

// 이름 저장하고 화면 새로 렌더링하는 함수
function saveName() {
  const name = nameInput.value.trim();
  if (name === "") return;

  localStorage.setItem("name", name);
  showGreeting();
}

// 저장된 이름 있으면 인삿말, 없으면 입력 받는 함수
function showGreeting() {
  const savedName = localStorage.getItem("name");
  todoArea.style.display = "none";

  if (savedName) {
    greeting.textContent = `${savedName}님 안녕하세요!`;
    nameInputArea.style.display = "none";
    todoArea.style.display = "block";
  }
}

// localStorage에서 Todos 가져오는 함수 (string -> 객체)
function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// localStorage에 Todos 저장하는 함수 (객체 -> string)
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// id 비교하여 todo 항목 찾아오는 함수
function findTodoById(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  return { todos, todo };
}

// Todos 가져와서 화면에 새로 렌더링하는 함수
function renderTodos() {
  const todos = loadTodos();

  // 완료 항목은 하단으로 내려보내기, 등록 시간 기준 최신 순 정렬
  todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt - a.createdAt; 
    }
    return a.completed - b.completed;
  });

  list.innerHTML = "";  // list(ul) 내부 비워주기

  // 객체 순회하며 하나씩 추가하기
  // li 안에 checkbox+span, li 태그의 data-id는 todo 식별용 (dataset.id로 접근)
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.textContent = todo.text;

    // class 속성으로 checked 추가하여 css로 줄긋기 적용
    if (todo.completed) span.classList.add("checked");

    li.appendChild(checkbox);
    li.appendChild(span);

    list.appendChild(li);
  });
}

// 새 Todo 추가하는 함수
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todos = loadTodos();

  const todo = {
    id: Date.now(),
    text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    completed: false
  };

  todos.unshift(todo);
  saveTodos(todos);
  renderTodos();

  todoInput.value = "";
}

// 엔터 치면 버튼 눌리도록 하는 유틸 함수
// (keydown은 한글 value값 전송 시 조합 문제 발생할 수 있어 keyup 사용)
function enterKeyup(element, func) {
  element.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      func();
    }
  })
}

// 체크 박스 클릭 시 todo 완료 처리하는 함수
function handleCheckbox(e) {
  if (!e.target.matches("input[type='checkbox']")) return;

  const checkbox = e.target;
  const li = checkbox.closest("li");  // 현재 체크박스로부터 가장 가까운 조상 요소 li 찾기
  if (!li) return;

  const id = Number(li.dataset.id);
  const { todos, todo } = findTodoById(id);
  if (!todo) return;

  todo.completed = checkbox.checked;

  saveTodos(todos);
  renderTodos();
}

// 텍스트(span) 클릭 시 수정 모드로 변경하는 함수
// 보기엔 수정 모드로 바뀌는 것 같지만 사실 li 태그는 숨기고 수정 창 생성하여 보이도록 하는 것
function handleTodoClick(e) {
  if (!e.target.matches("span")) return;

  const span = e.target;
  const li = span.closest("li");
  if (!li) return;

  // 완료된 todo는 수정 불가
  const checkbox = li.querySelector("input[type='checkbox']");
  if (checkbox && checkbox.checked) return;

  const id = Number(li.dataset.id);
  const { todos, todo } = findTodoById(id);
  if (!todo) return;

  span.style.display = "none";

  li.classList.add("editing");
  const editTodoInput = document.createElement("input");
  editTodoInput.type = "text";
  editTodoInput.value = todo.text;
  editTodoInput.id = "editTodoInput";
  li.appendChild(editTodoInput);
  editTodoInput.focus();

  const saveEdit = () => {
    const newText = editTodoInput.value.trim();
    if (newText !== "") {
      todo.text = newText;
      todo.updatedAt = Date.now();
      saveTodos(todos);
    }
    li.classList.remove("editing");
    renderTodos();
  };
  
  enterKeyup(editTodoInput, saveEdit);
  editTodoInput.addEventListener("blur", saveEdit);
}

showGreeting();
renderTodos();

saveNameBtn.addEventListener("click", saveName);
addTodoBtn.addEventListener("click", addTodo);

enterKeyup(nameInput, saveName);
enterKeyup(todoInput, addTodo);

list.addEventListener("change", handleCheckbox);
list.addEventListener("click", handleTodoClick);