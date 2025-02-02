// This file defines the authentication state using Redux Toolkit's createSlice().
// It manages user authentication, JWT token storage, and provides actions for login and logout.
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../services/axiosClient';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  await axiosClient.post('/api/auth/login', credentials); //, { withCredentials: true });
  return true; // No token needed, cookie is set automatically
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axios.post('/api/auth/logout', { withCredentials: true });
  return false;
});

// reateSlice() automatically generates Redux actions & reducers.
// 'auth' is the slice name, used in Redux DevTools for debugging.
const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false },
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setAuthenticated } = authSlice.actions;
// The reducer is exported to be included in the Redux store (store.ts).
export default authSlice.reducer;
