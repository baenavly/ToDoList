import { useState } from "react";
import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
};

function TodoItem({ todo, onToggleTodo, onEditTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = editText.trim(); // 앞뒤 공백 제거
    if (!trimmed) return;

    onEditTodo(todo.id, trimmed);
    setIsEditing(false);
  };

  return (
    <li className={isEditing ? "editing" : ""}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />

      {isEditing ? (
        <input
          id="editTodoInput"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyUp={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span
          className={todo.completed ? "checked" : ""}
          onClick={() => {
            if (todo.completed) return;
            setIsEditing(true);
          }}
        >
          {todo.text}
        </span>
      )}
    </li>
  );
}

export default TodoItem;
