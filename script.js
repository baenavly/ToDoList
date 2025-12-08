const greeting = document.getElementById("greeting");
const nameInputArea = document.getElementById("nameInputArea");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const todoArea = document.getElementById("todoArea");

function showGreeting() {
  const savedName = localStorage.getItem("name");
  todoArea.style.display = "none";

  if (savedName) {
    greeting.textContent = `${savedName}님 안녕하세요!`;
    nameInputArea.style.display = "none";
    todoArea.style.display = "block";
  }
}

showGreeting();

saveNameBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name === "") return;

    localStorage.setItem("name", name);
    showGreeting();
});

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const list = document.getElementById("todoList");

function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(span);

    list.prepend(li);

    todoInput.value = "";

    let todos = loadTodos();

    let todo = {
      id: Date.now(),
      text: text,
      createdAt: Date.now(),
      ModifiedAt: Date.now(),
      completed: false
    };

    todos.push(todo);

    saveTodos(todos);
});
