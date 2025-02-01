# **📌 Step 6: Forms & Validation with React Hook Form & Yup**
### **Goal:**
- Use **React Hook Form** for efficient form handling.
- Implement **Yup** for schema-based form validation.
- Handle form submission with **real-time validation** and **error messages**.

---

## **1️⃣ Install Dependencies**
```bash
npm install react-hook-form @hookform/resolvers yup
```
✅ **`react-hook-form`** → Manages forms efficiently.  
✅ **`@hookform/resolvers`** → Connects Yup with React Hook Form.  
✅ **`yup`** → Schema validation library.

---

## **2️⃣ Create a Basic Form Component**
📌 **Create `src/components/LoginForm.tsx`:**
```tsx
import React from "react";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
```
✅ Uses `useForm()` to handle form state.  
✅ `register()` connects inputs to React Hook Form.  
✅ `handleSubmit()` manages submission.  
✅ Displays **error messages** for missing inputs.

---

## **3️⃣ Add Validation with Yup**
📌 **Modify `LoginForm.tsx` to Use Yup Validation:**
```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
```
✅ `yup.object({...})` defines validation rules.  
✅ **`yupResolver(schema)`** integrates Yup with React Hook Form.  
✅ **Now the form enforces validation before submission**.

---

## **4️⃣ Use the Form in a Page**
📌 **Modify `src/pages/LoginPage.tsx`:**
```tsx
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
```
✅ Displays the login form on the `/login` page.

---

## **5️⃣ Add the Login Route to Router**
📌 **Modify `src/routes/Router.tsx`:**
```tsx
<Route path="/login" element={<LoginPage />} />
```
✅ The login form is now **accessible via `/login`**.

---

## **6️⃣ Save This Step in GitHub**
```bash
git checkout -b step-6-forms-validation
git add .
git commit -m "Step 6: Implemented forms & validation with React Hook Form & Yup"
git push origin step-6-forms-validation
```

---

## **✅ Summary of What We Built**
🔹 **React Hook Form for form handling**  
🔹 **Yup for schema-based validation**  
🔹 **Error handling for form inputs**  
🔹 **Login page with validation & form submission**

---

# **📌 Step 6 - Enhancing Authentication: Storing JWT Tokens in Local Storage**
### **Goal:**
- Store authentication **tokens (JWT)** in `localStorage` for persistent login.
- Automatically **restore authentication state** on page refresh.
- Securely **handle login/logout** with token storage.

---

## **1️⃣ Modify `AuthContext.tsx` to Store JWT Tokens**
📌 **Modify `src/context/AuthContext.tsx`:**
```tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
```

### **📝 Changes & How It Works**
✅ Uses `localStorage` to **persist authentication** across page reloads.  
✅ `login(token)` stores **JWT token** in local state & `localStorage`.  
✅ `logout()` **removes** token from both state & `localStorage`.  
✅ `isAuthenticated` is **derived from the token presence**.

---

## **2️⃣ Modify Login to Store Token**
📌 **Modify `src/components/LoginForm.tsx`:**
```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Simulated API Call (Replace with actual API request)
      const response = await fakeApiLogin(data.email, data.password);
      login(response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

// Fake API function (Replace with real API request)
const fakeApiLogin = async (email: string, password: string) => {
  return new Promise<{ token: string }>((resolve) =>
    setTimeout(() => resolve({ token: "fake-jwt-token-12345" }), 1000)
  );
};

export default LoginForm;
```

### **📝 Changes & How It Works**
✅ On **successful login**, the JWT token is **stored in `localStorage`**.  
✅ `fakeApiLogin()` **simulates** an API request (replace with real API).  
✅ **After login**, user is redirected to `/dashboard`.

---

## **3️⃣ Ensure `/dashboard` is Protected**
📌 **Modify `src/routes/Router.tsx`:**
```tsx
<Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><DashboardPage /></ProtectedRoute>} />
```
✅ Users **without a valid token** are redirected to `/login`.

---

## **4️⃣ Modify Logout to Remove Token**
📌 **Modify `src/pages/DashboardPage.tsx`:**
```tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default DashboardPage;
```
✅ Clicking **Logout** **removes the JWT token** from local storage.  
✅ **User is redirected to `/login`** after logout.

---

## **5️⃣ Save This Step in GitHub**
```bash
git checkout -b step-6-jwt-auth
git add .
git commit -m "Step 6: Enhanced authentication with JWT token storage"
git push origin step-6-jwt-auth
```

---

## **✅ Summary of What We Built**
| Feature | Implementation |
|---------|---------------|
| ✅ Store JWT Token | `localStorage.setItem("authToken", token)` |
| ✅ Restore Auth on Page Reload | Reads token from `localStorage` |
| ✅ Protect `/dashboard` | Redirects unauthenticated users |
| ✅ Logout Functionality | Removes token & redirects to `/login` |
