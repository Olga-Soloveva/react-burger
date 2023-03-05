import { createSlice } from "@reduxjs/toolkit";
import { onLogin } from "../actions/users";

export const userSlice = createSlice({
    name: "user",
    initialState: {
      user: {},
      signInRequest: false,
      signInFailed: false,
    },
    extraReducers: (builder) => {
      builder
        .addCase(onLogin.pending, (state, action) => {
          state.signInRequest = true;
          state.signInFailed = false;
        })
        .addCase(onLogin.fulfilled, (state, action) => {
          state.user = action.payload
          state.signInRequest = false;
        })
        .addCase(onLogin.rejected, (state, action) => {
          state.signInRequest = false;
          state.signInFailed = true;
        });
    },
  });