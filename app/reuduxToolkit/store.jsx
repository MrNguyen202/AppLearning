import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Tích hợp userSlice vào store
  },
});

export default store;
