import { createAsyncThunk } from "@reduxjs/toolkit";
import { useProvideAuth } from "../../utils/auth";

export const onLogin = createAsyncThunk("user/onLogin", async (form) => {
  const { signIn } = useProvideAuth();
  const response = await signIn(form);
  return response;
});

