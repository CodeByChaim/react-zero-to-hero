import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { LoginFormInputs } from '../types/type';
import { login } from '../store/authSlice';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
});

// Fake API function (Replace with real API request)
const dummyApiLogin = async (data: LoginFormInputs) => {
  console.log('Form Data:', data);
  return new Promise<{ token: string }>((resolve) =>
    setTimeout(() => resolve({ token: uuidv4() }), 1000),
  );
};

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
      // Simulated API Call (Replace with actual API request)
      const response = await dummyApiLogin(data);
      console.log('Token:', response.token);
      dispatch(login(response.token)); // Update authentication state
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error('Login failed:', error);
      navigate('/'); // Redirect to Home after login
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type={'email'}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type={'password'}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type={'submit'}>Login</button>
    </form>
  );
};

export default LoginForm;
