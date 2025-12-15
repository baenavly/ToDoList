import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos } = useTodos();

  return (
    <div>
      <h1>Todo List</h1>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
