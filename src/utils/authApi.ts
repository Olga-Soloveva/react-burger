import { request } from "./utilsApi";
import { getCookie } from "./utilsApi";
import { TFormValues } from "./types";
import { TToken, TUserWithToken, TResWithoutData } from "./types";

const onRegisterRequest = (form: TFormValues): Promise<TUserWithToken> =>
  request("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  });

const onLoginRequest = (form: TFormValues): Promise<TUserWithToken> =>
  request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });

const onLogOutRequest = (): Promise<TResWithoutData> =>
  request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

  const refreshTokenRequest = (): Promise<TToken>  =>
  request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

const forgotPasswordRequest = (form: TFormValues): Promise<TResWithoutData> =>
  request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
    }),
  });

const resetPasswordRequest = (form: TFormValues): Promise<TResWithoutData> =>
  request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: form.password,
      token: form.token,
    }),
  });

export {
  onRegisterRequest,
  onLoginRequest,
  onLogOutRequest,
  refreshTokenRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
};
