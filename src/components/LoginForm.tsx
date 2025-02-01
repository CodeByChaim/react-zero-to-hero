import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginFormInputs } from '../types/type';
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
});

const LoginForm: React.FC = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });
  const onSubmit = (data: LoginFormInputs) => {
    console.log('Form Data:', data);
    login(); // Update authentication state
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type='email' {...register('email', { required: 'Email is required' })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type='password' {...register('password', { required: 'Password is required' })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
