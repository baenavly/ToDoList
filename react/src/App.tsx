import { useState } from "react";
import type { Todo } from "./types/todo";

function App() {
  const [name, setName] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleNameSubmit = () => {
    if (!nameInput.trim()) return;
    setName(nameInput)
  };

  const handleTodoSubmit = () => {
    if (!todoInput.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: todoInput,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
    setTodoInput("");
  };

  return (
    <div>
      {name === "" ? (
        
      ) : (
        <>
          <h1>{name}님 안녕하세요!</h1>

          <div>
            <input
              type="text"
              placeholder="할 일을 입력하세요"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button onClick={handleTodoSubmit}>추가</button>
          </div>
          
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
