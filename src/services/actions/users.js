import { createAsyncThunk } from "@reduxjs/toolkit";
import { useProvideAuth } from "../../utils/auth";

export const onLogin = createAsyncThunk("user/onLogin", async (form) => {
  const { onLogin } = useProvideAuth();
  const response = await onLogin(form);
  return response;
});

export const onRegister = createAsyncThunk("user/onRegister", async (form) => {
  const { onRegister } = useProvideAuth();
  const response = await onRegister(form);
  return response;
});

export const onLogOut = createAsyncThunk("user/onLogOut", async () => {
  const { onLogOut } = useProvideAuth();
  const response = await onLogOut();
  return response;
});
