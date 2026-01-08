// 저장된 유저 정보 전부 불러오기
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

// 유저 정보 전부 저장하기
export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// 현재 로그인한 유저 닉네임 불러오기
export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// 현재 로그인한 유저 닉네임 저장하기
export function setCurrentUser(name) {
  localStorage.setItem("currentUser", name);
}

// 로그아웃 시 현재 로그인한 유저 닉네임 삭제하기
export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}
