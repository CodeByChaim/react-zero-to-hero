// This file defines the authentication state using Redux Toolkit's createSlice().
// It manages user authentication, JWT token storage, and provides actions for login and logout.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

// Initial state: Check localStorage for a stored token
//  Checks localStorage for an auth token when Redux initializes,
// if a token exists, isAuthenticated is set to true.
const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
};

// reateSlice() automatically generates Redux actions & reducers.
// "auth" is the slice name, used in Redux DevTools for debugging.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action: Stores token and sets isAuthenticated to true
    // Updates Redux state with the received JWT token.
    // Saves token in localStorage for persistence.
    // Sets isAuthenticated to true, allowing access to protected routes
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload);
    },
    // Logout action: Clears token and resets authentication state
    // Clears Redux state by removing the token.
    // Deletes token from localStorage to log the user out.
    // Sets isAuthenticated to false, blocking access to protected routes.
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
});

// login and logout are exported as actions to be used in components.
export const { login, logout } = authSlice.actions;
// The reducer is exported to be included in the Redux store (store.ts).
export default authSlice.reducer;
