import { getCurrentUser, clearCurrentUser } from "./storage.js";

// 로그인한 유저 없다면 로그인 페이지 띄우기
export function guardAuth() {
  const user = getCurrentUser();
  if (!user) {
    location.href = "login.html";
  }
}

// 로그아웃 시 정보 삭제하고 로그인 페이지 듸우기
export function logout() {
  clearCurrentUser();
  location.href = "login.html";
}
