import { useState, useEffect, useMemo } from "react";
import Greeting from "./components/Greeting";
import useTodos from "./hooks/useTodos";
import TodoInput from "./components/Todo/TodoInput";
import TodoList from "./components/Todo/TodoList";
import NameInput from "./components/NameForm/NameInput";
import { sortTodos } from "./utils/todos";
import "./App.css";

function App() {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") ?? ""; // a ?? b a가 null 또는 undefined이면 b를 써라
  });

  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
  }, [name]);

  const { todos, addTodo, toggleTodo, editTodo } = useTodos();

  const sortedTodos = useMemo(() => sortTodos(todos), [todos]);

  return (
    <>
      {name === "" ? (
        <NameInput onSubmitName={setName} />
      ) : (
        <>
          <Greeting name={name} />
          <TodoInput onSubmitTodo={addTodo} />
          <TodoList
            todos={sortedTodos}
            onToggleTodo={toggleTodo}
            onEditTodo={editTodo}
          />
        </>
      )}
    </>
  );
}

export default App;

// focus, blur 이벤트로 editing 효과 주기
// modify 기능 추가하기
