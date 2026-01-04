import { useState } from "react";

type TodoInputProps = {
  onSubmitTodo: (text: string) => void;
};

function TodoInput({ onSubmitTodo }: TodoInputProps) {
  const [todoInput, setTodoInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmitTodo = () => {
    if (!todoInput.trim()) return;

    onSubmitTodo(todoInput.trim());
    setTodoInput("");
  };

  return (
    <div className="input-area">
      <input
        className={`text-input ${isFocused ? "editing" : ""}`} // focus, blur 이벤트에 따라 css 적용
        id="todoInput"
        type="text"
        placeholder="할 일을 입력하세요"
        value={todoInput}
        onKeyUp={(e) => e.key === "Enter" && handleSubmitTodo()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button id="addTodoBtn" onClick={handleSubmitTodo}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
