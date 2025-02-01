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
