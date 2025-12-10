const greeting = document.getElementById("greeting");
const nameInputArea = document.getElementById("nameInputArea");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const todoArea = document.getElementById("todoArea");

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const list = document.getElementById("todoList");

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

// localStorage에서 Todos 가져오는 함수
// string -> 객체
function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// localStorage에서 Todos 저장하는 함수
// 객체 -> string
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Todos 가져와서 화면에 새로 렌더링하는 함수
function renderTodos() {
  const todos = loadTodos();
  list.innerHTML = "";  // list(ul) 내부 비워주기

  // 객체 순회하며 하나씩 추가하기
  // li 안에 checkbox+span, li 태그 속성 중 data-id에 접근하기 위해 dataset.id 사용. id는 todo 식별 위해 추가
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

// 새 Todo를 추가하는 함수
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

// 엔터 치면 버튼 눌리도록 하는 함수 (enterKeydown으로 하면 keydown, up 사이에 한글 value값 전송 시 문제 발생하기 때문에 예외 없이 처리하기 위해 keyup 사용)
function enterKeyup(focus, btn) {
  focus.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      btn.click();
    }
  })
}


showGreeting();

saveNameBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name === "") return;

  localStorage.setItem("name", name);
  showGreeting();
});

renderTodos();

addTodoBtn.addEventListener("click", () => {
  addTodo();
});

list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    // 현재 체크박스로부터 가장 가까운 조상 요소 li 찾기
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    let todos = loadTodos();
    const todo = todos.find(t => t.id === id);

    todo.completed = e.target.checked;
    todo.updatedAt = Date.now();

    saveTodos(todos);
    renderTodos();
  }
})

enterKeyup(nameInput, saveNameBtn);
enterKeyup(todoInput, addTodoBtn);