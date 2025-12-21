import { useEffect, useState } from "react";
import { type Todo } from "../types/todo";
import { loadTodos } from "../utils/storage";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = loadTodos();
        setTodos(storedTodos);
    }, []);

    return {
        todos,
    };
}