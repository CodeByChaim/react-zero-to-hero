import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { loginUser } from '../store/authSlice';
import { setAuthenticated } from '../store/authSlice';
import axiosClient from '../services/axiosClient';

export const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosClient.get('/api/auth/validate') //, { withCredentials: true })
      // .then(() => dispatch(loginUser()))
      .then(() => dispatch(setAuthenticated(true))) // ✅ Fix: Dispatch normal action
      .catch(() => console.log('Not authenticated'));
  }, [dispatch]);
};
