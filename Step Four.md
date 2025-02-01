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
