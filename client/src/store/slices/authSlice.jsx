// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  token: localStorage.getItem("token") || undefined,
  isLogged: false,
  user: {},
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.isLogged = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // console.log("🚀 ~ action.payload.user:", action.payload.user);
    },
    // Add this new reducer
    updateUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // If you need to update specific localStorage items:
      if (action.payload.roleId?.type) {
        localStorage.setItem("role", action.payload.role);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.token = "";
      state.user = {};
      state.isLogged = false;
    });
  },
});

export const logout = createAsyncThunk(
  "auth/logout",
  async function (_, { dispatch }) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // localStorage.removeItem("user");
  }
);

// Export all action creators including the new updateUserState
export const { login, updateUserState, setLoading, clearError } =
  authSlice.actions;
export default authSlice.reducer;
