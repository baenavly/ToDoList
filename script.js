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
function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// localStorage에서 Todos 저장하는 함수
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Todos 가져와서 화면에 새로 렌더링하는 함수
function renderTodos() {
  const todos = loadTodos();
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.textContent = todo.text;

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