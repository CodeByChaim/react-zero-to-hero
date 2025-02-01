# **📌 Step 2: State Management with Hooks (`useState`, `useEffect`)**
### **Goal:** Learn how to manage component state using **React hooks** (`useState`, `useEffect`) with a **Todo App**.

---

## **1️⃣ Install Dependencies (Optional)**
If you're using CRA, there's nothing extra needed. However, for API requests later, install Axios:
```bash
npm install axios
```

---

## **2️⃣ Create the Todo App Structure**
Modify `src/App.tsx`:
```tsx
import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div>
      <h1>React Advanced - Todo App</h1>
      <TodoList />
    </div>
  );
};

export default App;
```

---

## **3️⃣ Create the Todo Component**
Create `src/components/TodoList.tsx`:
```tsx
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>✓</button>
            <button onClick={() => removeTodo(todo.id)}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

---

## **4️⃣ Add `useEffect` to Load Todos from Local Storage**
Modify `TodoList.tsx`:
```tsx
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>✓</button>
            <button onClick={() => removeTodo(todo.id)}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

---

## **5️⃣ Save This Step in GitHub**
```bash
git checkout -b step-2-state-management
git add .
git commit -m "Step 2: State management with useState & useEffect (Todo App)"
git push origin step-2-state-management
```
