
## **📌 Step 1: Project Setup using CRA**
### **Goal:**
Set up a **scalable** React/TypeScript project with a clean folder structure.

---

### **1️⃣ Create a React App with TypeScript**
Run the following command:
```bash
npx create-react-app react-advanced --template typescript
cd react-advanced
```

---

### **2️⃣ Clean Up the Boilerplate**
Remove unnecessary files:
```bash
rm -rf src/App.css src/index.css src/logo.svg
```

Modify `src/App.tsx`:
```tsx
import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div>
      <Header title="React Advanced Project" />
      <p>Welcome to the React TypeScript Project!</p>
    </div>
  );
};

export default App;
```

Modify `src/index.tsx`:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### **3️⃣ Create a Simple Component**
Create `src/components/Header.tsx`:
```tsx
import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Header;
```

---

### **4️⃣ Set Up ESLint & Prettier**
```bash
npm install --save-dev eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
```

Create `.eslintrc.json`:
```json
{
  "extends": ["react-app", "plugin:react/recommended", "plugin:prettier/recommended"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off"
  }
}
```

---

### **5️⃣ Run the Project**
```bash
npm start
```

---

### **6️⃣ Save the Step in GitHub**
```bash
git init
git checkout -b step-1-setup
git add .
git commit -m "Step 1: Project setup with CRA & basic components"
git remote add origin <your-github-repo-url>
git push origin step-1-setup
```

---

Now that **Step 1** is complete, we can move to **Step 2: State Management with Hooks**.  
Would you like to start with a **simple counter** or **a Todo App** using `useState`? 🚀