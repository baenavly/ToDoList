import type { Todo } from "../types/todo";

const STORAGE_KEY = "todos"

export function loadTodos(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
}

export function saveTodos(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}