import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Lưu thông tin người dùng
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Cập nhật thông tin user
    },
    clearUser(state) {
      state.user = null; // Xóa thông tin user khi logout
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
