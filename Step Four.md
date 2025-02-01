# **📌 Step 4: Routing with React Router (`react-router-dom`)**
### **Goal:** Implement **client-side routing** with `react-router-dom` to navigate between different pages.

---

## **1️⃣ Install `react-router-dom`**
```bash
npm install react-router-dom
```

---

## **2️⃣ Create a `Router.tsx` Component**
This component will manage all the routes in our app.

📌 **Create** `src/routes/Router.tsx`:
```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

---

## **3️⃣ Create Pages for Navigation**
📌 **Create `src/pages/HomePage.tsx`:**
```tsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the React Advanced Project.</p>
      <nav>
        <Link to="/about">Go to About</Link>
      </nav>
    </div>
  );
};

export default HomePage;
```

📌 **Create `src/pages/AboutPage.tsx`:**
```tsx
import React from "react";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a simple multi-page React app using React Router.</p>
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
};

export default AboutPage;
```

📌 **Create `src/pages/NotFoundPage.tsx`:**
```tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <nav>
        <Link to="/">Return to Home</Link>
      </nav>
    </div>
  );
};

export default NotFoundPage;
```

---

## **4️⃣ Use the Router in `App.tsx`**
📌 **Modify `src/App.tsx`:**
```tsx
import React from "react";
import AppRouter from "./routes/Router";

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
```

---

## **5️⃣ Run the Project**
```bash
npm start
```
✅ **Navigate to:**
- `http://localhost:3000/` → Home Page
- `http://localhost:3000/about` → About Page
- `http://localhost:3000/xyz` → 404 Page

---

## **6️⃣ Save This Step in GitHub**
```bash
git checkout -b step-4-routing
git add .
git commit -m "Step 4: Implemented React Router with basic pages"
git push origin step-4-routing
```
# **📌 Step 4 (Part 2): Protected Routes & Dynamic Routing**
### **Goal:**
- **Protect certain routes** (e.g., `/dashboard`) so only authenticated users can access them.
- **Implement dynamic routes** (e.g., `/profile/:id`).

---

## **1️⃣ Implement Protected Routes (Auth-based Routing)**
We'll create a **higher-order component (HOC)** to **protect routes**.

📌 **Create `src/routes/ProtectedRoute.tsx`:**
```tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```
✅ **If the user is authenticated**, they can access the route.  
✅ **Otherwise, they are redirected** to `/login`.

---

## **2️⃣ Create Authentication Logic**
📌 **Create `src/context/AuthContext.tsx`:**
```tsx
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
✅ The `AuthContext` **manages authentication state**.  
✅ `useAuth()` allows components to **access login/logout functions**.

---

## **3️⃣ Create Login & Dashboard Pages**
📌 **Create `src/pages/LoginPage.tsx`:**
```tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
```

📌 **Create `src/pages/DashboardPage.tsx`:**
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
      <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
    </div>
  );
};

export default DashboardPage;
```
✅ **Login button** sets `isAuthenticated = true` and redirects to `/dashboard`.  
✅ **Logout button** resets authentication and redirects to `/`.

---

## **4️⃣ Update Router to Include Protected Routes**
📌 **Modify `src/routes/Router.tsx`:**
```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```
✅ **The `/dashboard` route is now protected**.  
✅ **Unauthenticated users are redirected to `/login`**.

---

## **5️⃣ Implement Dynamic Routing**
Let’s create a **profile page** that loads user data dynamically from the URL.

📌 **Create `src/pages/ProfilePage.tsx`:**
```tsx
import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Viewing profile of user ID: {id}</p>
    </div>
  );
};

export default ProfilePage;
```
✅ `useParams()` extracts the **`:id`** from the URL.

---

## **6️⃣ Add Dynamic Route to Router**
📌 **Modify `src/routes/Router.tsx`:**
```tsx
<Route path="/profile/:id" element={<ProfilePage />} />
```
✅ Now visiting **`/profile/123`** will show `User ID: 123`.

---

## **7️⃣ Wrap App in `AuthProvider`**
📌 **Modify `src/App.tsx`:**
```tsx
import React from "react";
import AppRouter from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
```
✅ This **provides authentication state** to the entire app.

---

## **8️⃣ Save This Step in GitHub**
```bash
git checkout -b step-4-protected-routes
git add .
git commit -m "Step 4: Added protected routes and dynamic routing"
git push origin step-4-protected-routes
```

---

## **✅ Summary of What We Built**
🔹 **Protected Routes** (e.g., `/dashboard` requires login)  
🔹 **AuthContext for Authentication**  
🔹 **Login & Logout Pages**  
🔹 **Dynamic Routing (`/profile/:id`)**
