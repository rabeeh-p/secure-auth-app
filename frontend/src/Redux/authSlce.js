// src/Redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access: null,
  refresh: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.username = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
