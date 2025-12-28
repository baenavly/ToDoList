import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
};

function TodoList({ todos, onToggleTodo }: TodoListProps) {
  return (
    <ul id="todoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggleTodo={onToggleTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
