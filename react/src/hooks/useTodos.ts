import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";
import { loadTodos, saveTodos } from "../utils/storage";

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, updatedAt: Date.now() }
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
  };
}

export default useTodos;
