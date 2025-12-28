import { useState } from "react";

type TodoInputProps = {
  onSubmitTodo: (text: string) => void;
};

function TodoInput({ onSubmitTodo }: TodoInputProps) {
  const [todoInput, setTodoInput] = useState("");

  const handleSubmitTodo = () => {
    if (!todoInput.trim()) return;

    onSubmitTodo(todoInput.trim());
    setTodoInput("");
  };

  return (
    <div className="input-area">
      <input
        className="text-input"
        id="todoInput"
        type="text"
        placeholder="할 일을 입력하세요"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button id="addTodoBtn" onClick={handleSubmitTodo}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
