import { getUsers, saveUsers, setCurrentUser } from "./storage.js";
import { handleInputFocus, handleInputBlur, enterKeyup } from "./utils/dom.js";

const nameInput = document.getElementById("nameInput");
const loginBtn = document.getElementById("loginBtn");

function login() {
  const name = nameInput.value.trim();
  if (!name) return;

  const users = getUsers();

  // 새로운 유저라면 유저 정보 추가하기
  if (!users[name]) {
    users[name] = { todos: [] };
  }

  saveUsers(users);
  setCurrentUser(name);

  location.href = "index.html";
}

nameInput.addEventListener("focus", handleInputFocus);
nameInput.addEventListener("blur", handleInputBlur);

loginBtn.addEventListener("click", login);
enterKeyup(nameInput, login);
