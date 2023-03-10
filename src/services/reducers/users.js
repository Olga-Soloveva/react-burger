import { createSlice } from "@reduxjs/toolkit";
import { onLogin, onRegister, onLogOut } from "../actions/users";

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
        state.user = {}
      })
  },
});
