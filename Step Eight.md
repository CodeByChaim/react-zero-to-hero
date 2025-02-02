# **🚀 Step 8: Advanced Hooks (`useMemo`, `useCallback`) & Custom Hooks ( `useFetch`)**
### **Goal:** Improve performance using `useMemo`, `useCallback`, and `React.memo`

---

## **🔹 1️⃣ Understanding Advanced Hooks**
### **✅ `useReducer` → Manages Complex State Logic**
- **Alternative to `useState`** for handling **complex state transitions**.
- Uses a **reducer function** similar to Redux.

📌 **Example: Counter with `useReducer`**
```tsx
import React, { useReducer } from "react";

// Reducer function
const counterReducer = (state: number, action: { type: "increment" | "decrement" }) => {
  switch (action.type) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    default: return state;
  }
};

const Counter: React.FC = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>➕ Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>➖ Decrement</button>
    </div>
  );
};

export default Counter;
```
✅ **Why use `useReducer`?** → It **simplifies state logic** and avoids **deeply nested `useState` calls**.

---

### **✅ `useRef` → Persistent References Without Re-Renders**
- Used to **store mutable values** that **do not trigger re-renders**.
- Often used to reference **DOM elements** or persist **previous values**.

📌 **Example: Storing Input Field Reference**
```tsx
import React, { useRef } from "react";

const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
    </div>
  );
};

export default InputFocus;
```
✅ **Why use `useRef`?** → It **persists values across renders** without causing re-renders.

---

### **✅ `useMemo` → Optimize Performance by Memoizing Expensive Calculations**
- Prevents unnecessary re-computation **by memoizing values**.

📌 **Example: Optimizing a Slow Computation**
```tsx
import React, { useState, useMemo } from "react";

const ExpensiveComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  // Memoizing the computation
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    return count * 100;
  }, [count]);

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increase</button>
    </div>
  );
};

export default ExpensiveComponent;
```
✅ **Why use `useMemo`?** → It **caches results**, preventing unnecessary calculations.

---

### **✅ `useCallback` → Memoize Functions to Prevent Unnecessary Re-Renders**
- Useful when **passing functions as props** to child components.

📌 **Example: Memoizing Event Handlers**
```tsx
import React, { useState, useCallback } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  // Memoize function to prevent re-creation on every render
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>➕ Increment</button>
    </div>
  );
};

export default Counter;
```
✅ **Why use `useCallback`?** → Prevents **child components from re-rendering** unnecessarily.

---

## **🔹 2️⃣ Creating Custom Hooks**
Custom hooks **encapsulate logic** into reusable functions.

### **✅ `useFetch` → Fetch Data from an API**
📌 **Custom Hook for API Calls**
```tsx
import { useState, useEffect } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};
```

📌 **Using `useFetch` Hook in a Component**
```tsx
import React from "react";
import { useFetch } from "../hooks/useFetch";

const UsersList: React.FC = () => {
  const { data: users, loading } = useFetch<{ id: number; name: string }[]>("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
```
✅ **Why use custom hooks?** → **Encapsulates logic**, making components cleaner.

---

### **✅ `useLocalStorage` → Persistent Storage for User Preferences**
📌 **Custom Hook for Local Storage**
```tsx
import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
```

📌 **Using `useLocalStorage` Hook in a Theme Switcher**
```tsx
import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
```
✅ **Why use `useLocalStorage`?** → **Persists user preferences** across sessions.

---

## **🔹 3️⃣ Saving This Step in GitHub**
```bash
git checkout -b step-8-advanced-hooks
git add .
git commit -m "Step 8: Implemented Advanced Hooks & Custom Hooks"
git push origin step-8-advanced-hooks
```
