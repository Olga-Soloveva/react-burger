import { createSlice } from "@reduxjs/toolkit";
import { onLogin } from "../actions/users";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    onLoginRequest: false,
    onLoginFailed: false,
  },
  reducers: {
    clearLoginFailed: (state) => {
      state.onLoginFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.pending, (state, action) => {
        state.onLoginRequest = true;
        state.onLoginFailed = false;
      })
      .addCase(onLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.onLoginRequest = false;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.onLoginRequest = false;
        state.onLoginFailed = true;
      });
  },
});
