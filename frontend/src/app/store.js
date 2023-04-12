import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import fileReducer from '../features/file/fileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer 
  },
});
