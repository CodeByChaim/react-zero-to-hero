# **📌 Step 5: API Integration with Axios & RTK Query**
### **Goal:**
- **Fetch and manage API data** in a scalable way.
- Use **Axios** for API requests.
- Introduce **RTK Query** for efficient data fetching.

---

## **1️⃣ Install Dependencies**
```bash
npm install axios @reduxjs/toolkit react-redux
```
✅ `axios` → Handles HTTP requests.  
✅ `@reduxjs/toolkit` → Manages global state.  
✅ `react-redux` → Connects Redux with React.

---

## **2️⃣ Create an API Service with Axios**
📌 **Create `src/api/apiClient.ts`:**
```tsx
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Example API
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
```
✅ This **centralizes API requests** for reuse.

---

## **3️⃣ Fetch Data in a Component**
📌 **Modify `HomePage.tsx` to Fetch Posts:**
```tsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface Post {
  id: number;
  title: string;
  body: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get<Post[]>("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
```
✅ Fetches **posts from API** and displays them.  
✅ Uses **loading state** for better UX.

---

## **4️⃣ Set Up Redux Toolkit & RTK Query**
📌 **Modify `src/store/store.ts`:**
```tsx
import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../store/postsApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
✅ Configures Redux store with **RTK Query middleware**.

---

## **5️⃣ Create an API Slice with RTK Query**
📌 **Create `src/store/postsApi.ts`:**
```tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getPosts: builder.query<{ id: number; title: string }[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
```
✅ Defines an **API slice** using `createApi`.  
✅ Exposes `useGetPostsQuery()` hook for fetching data.

---

## **6️⃣ Fetch Data Using RTK Query in a Component**
📌 **Modify `HomePage.tsx` to Use RTK Query:**
```tsx
import React from "react";
import { useGetPostsQuery } from "../store/postsApi";

const HomePage: React.FC = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
```
✅ Uses `useGetPostsQuery()` to fetch posts.  
✅ **No need for `useEffect` or `useState`**—RTK Query handles caching & fetching.

---

## **7️⃣ Wrap App with Redux Provider**
📌 **Modify `src/App.tsx`:**
```tsx
import React from "react";
import AppRouter from "./routes/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
```
✅ **Provides Redux state** to the entire app.

---

## **8️⃣ Save This Step in GitHub**
```bash
git checkout -b step-5-api-integration
git add .
git commit -m "Step 5: API integration with Axios & RTK Query"
git push origin step-5-api-integration
```

---

## **✅ Summary of What We Built**
🔹 **Axios for API calls**  
🔹 **RTK Query for optimized data fetching**  
🔹 **Redux store setup**  
🔹 **Fetching posts in `HomePage.tsx`**
