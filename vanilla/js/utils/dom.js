// 엔터 치면 버튼 눌리도록 하는 유틸 함수
// (keydown은 한글 value값 전송 시 조합 문제 발생할 수 있어 keyup 사용)
function enterKeyup(element, func) {
  element.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      func();
    }
  });
}
export { enterKeyup };

// input창에 focus되면 밑줄 색 진하게 바꿔주는 함수 (css 적용할 수 있게 class 추가 & 제거)
function handleInputFocus(e) {
  const input = e.target;
  input.classList.add("editing");
}

function handleInputBlur(e) {
  const input = e.target;
  input.classList.remove("editing");
}
export { handleInputFocus, handleInputBlur };
