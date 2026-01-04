import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";
import { loadTodos, saveTodos } from "../utils/storage";

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  // todos가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // 할 일 추가
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completed: false,
    };

    // 새로운 할 일을 맨 앞에 추가
    setTodos((prev) => [newTodo, ...prev]);
  };

  // 할 일 완료/미완료 변경
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일 수정
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
