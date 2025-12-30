import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
};

function TodoList({ todos, onToggleTodo, onEditTodo }: TodoListProps) {
  return (
    <ul id="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
