import { createSlice } from "@reduxjs/toolkit";
import {
  onLogin,
  onRegister,
  onLogOut,
  getUser,
  editUser,
} from "../actions/users";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    onLoginRequest: false,
    onLoginFailed: false,
    onRegisterRequest: false,
    onRegisterFailed: false,
  },
  reducers: {
    clearUser: (state) => {
      state.user = {};
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
      })
      .addCase(onRegister.pending, (state, action) => {
        state.onRegisterRequest = true;
        state.onRegisterFailed = false;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.onRegisterRequest = false;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.onRegisterRequest = false;
        state.onRegisterFailed = true;
      })
      .addCase(onLogOut.fulfilled, (state, action) => {
        state.user = {};
      })
      .addCase(getUser.pending, (state, action) => {
        state.onAuthorizationRequest = true;
        state.onAuthorizationFailed = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.onAuthorizationRequest = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.onAuthorizationRequest = false;
        state.onAuthorizationFailed = true;
      })
      .addCase(editUser.pending, (state, action) => {
        state.editUserRequest = true;
        state.editUserFailed = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.editUserRequest = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editUserRequest = false;
        state.editUserFailed = true;
      });
  },
});
