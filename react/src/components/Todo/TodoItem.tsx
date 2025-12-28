import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
};

function TodoItem({ todo, onToggleTodo }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
    </li>
  );
}

export default TodoItem;
