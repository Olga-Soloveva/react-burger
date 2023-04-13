import { createAsyncThunk } from "@reduxjs/toolkit";
import { useProvideAuth } from "../../utils/auth";
import { getUserRequest, editUserRequest } from "../../utils/userApi";
import { TFormValues } from "../../utils/types";

export const onLogin = createAsyncThunk("user/onLogin", async (form: TFormValues) => {
  const { onLogin } = useProvideAuth();
  const response = await onLogin(form);
  return response;
});

export const onRegister = createAsyncThunk("user/onRegister", async (form: TFormValues) => {
  const { onRegister } = useProvideAuth();
  const response = await onRegister(form);
  return response;
});

export const onLogOut = createAsyncThunk("user/onLogOut", async () => {
  const { onLogOut } = useProvideAuth();
  const response = await onLogOut();
  return response;
});

export const getUser = createAsyncThunk("user/authorization", async () => {
  return await getUserRequest();
});

export const editUser= createAsyncThunk("user/editUserInfo", async (form: TFormValues) => {
  return await editUserRequest(form);
});
