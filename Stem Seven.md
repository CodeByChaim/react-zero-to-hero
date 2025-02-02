# **📌 Step 7: State Management with Redux Toolkit**
### **Goal:**
- Manage **global state** with Redux Toolkit (RTK).
- Create a **slice** for managing authentication state.
- Use Redux **actions & reducers** to update the store.
- Integrate Redux with React components.

---

## **1️⃣ Install Dependencies**
```bash
npm install @reduxjs/toolkit react-redux
```
✅ **`@reduxjs/toolkit`** → Simplifies Redux state management.  
✅ **`react-redux`** → Connects Redux with React components.

---

## **2️⃣ Setup Redux Store**
📌 **Create `src/store/store.ts`:**
```tsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
✅ Central **Redux store** that manages state.  
✅ Includes **auth slice** (to be created next).

---

## **3️⃣ Create an Authentication Slice**
📌 **Create `src/store/authSlice.ts`:**
```tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```
✅ **`createSlice()`** manages authentication state.  
✅ `login(token)` updates Redux **and** stores token in `localStorage`.  
✅ `logout()` clears Redux state **and** removes the token.

---

## **4️⃣ Provide Store to React App**
📌 **Modify `src/App.tsx`:**
```tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRouter from "./routes/Router";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
```
✅ `Provider` wraps the app, **giving all components access to Redux state**.

---

## **5️⃣ Connect Login to Redux**
📌 **Modify `src/components/LoginForm.tsx`:**
```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fakeApiLogin(data.email, data.password);
      dispatch(login(response.token));
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

// Fake API function (Replace with real API)
const fakeApiLogin = async (email: string, password: string) => {
  return new Promise<{ token: string }>((resolve) =>
    setTimeout(() => resolve({ token: "fake-jwt-token-12345" }), 1000)
  );
};

export default LoginForm;
```
✅ **Replaces `useAuth()` with Redux `useDispatch()`**  
✅ `dispatch(login(token))` updates **Redux store** and **localStorage**.

---

## **6️⃣ Protect Routes with Redux State**
📌 **Modify `src/routes/ProtectedRoute.tsx`:**
```tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
```
✅ **Uses Redux store** instead of `AuthContext`.  
✅ Redirects **unauthenticated users** to `/login`.

---

## **7️⃣ Logout Using Redux**
📌 **Modify `src/pages/DashboardPage.tsx`:**
```tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { dispatch(logout()); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
```
✅ Uses Redux **`dispatch(logout())`** to clear authentication.

---

## **8️⃣ Save This Step in GitHub**
```bash
git checkout -b step-7-redux-toolkit
git add .
git commit -m "Step 7: Implemented state management with Redux Toolkit"
git push origin step-7-redux-toolkit
```

---

## **✅ Summary of What We Built**
| Feature | Implementation |
|---------|---------------|
| ✅ Global Auth State | Redux Toolkit Slice (`authSlice.ts`) |
| ✅ Token Storage | `localStorage.setItem("authToken", token)` |
| ✅ Login with Redux | `dispatch(login(token))` |
| ✅ Logout with Redux | `dispatch(logout())` |
| ✅ Protected Routes | Redirect unauthenticated users |
