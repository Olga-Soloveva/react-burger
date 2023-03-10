import { createAsyncThunk } from "@reduxjs/toolkit";
import { useProvideAuth } from "../../utils/auth";

export const onLogin = createAsyncThunk("user/onLogin", async (form) => {
  const { onLogin } = useProvideAuth();
  const response = await onLogin(form);
  return response;
});

