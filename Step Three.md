# **📌 Step 3: Advanced Hooks (`useReducer`, `useRef`, Custom Hooks`)**
### **Goal:** Improve state management using `useReducer`, handle uncontrolled inputs with `useRef`, and create reusable **custom hooks**.

---

## **1️⃣ Refactor Todo App to Use `useReducer`**
Using `useReducer` helps manage complex state transitions more effectively than `useState`.

### **Modify `TodoList.tsx`:**
```tsx
import React, { useReducer, useState, useEffect, useRef } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "REMOVE"; payload: number }
  | { type: "LOAD"; payload: Todo[] };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "LOAD", payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      dispatch({ type: "ADD", payload: inputRef.current.value });
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter a todo..." />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}>✓</button>
            <button onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

---

## **2️⃣ Create a Custom Hook for Local Storage**
Instead of manually managing local storage in `useEffect`, we can create a reusable hook.

### **Create `src/hooks/useLocalStorage.ts`:**
```tsx
import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
```

---

## **3️⃣ Use Custom Hook in `TodoList.tsx`**
Now, replace local storage logic with our `useLocalStorage` hook.

### **Update `TodoList.tsx`:**
```tsx
import React, { useReducer, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "REMOVE"; payload: number };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [state, dispatch] = useReducer(todoReducer, todos);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      dispatch({ type: "ADD", payload: inputRef.current.value });
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter a todo..." />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {state.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}>✓</button>
            <button onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

---

## **4️⃣ Save This Step in GitHub**
```bash
git checkout -b step-3-advanced-hooks
git add .
git commit -m "Step 3: Advanced hooks (useReducer, useRef, custom hooks)"
git push origin step-3-advanced-hooks
```
