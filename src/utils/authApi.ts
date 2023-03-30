import { request } from "./utilsApi";
import { getCookie } from "./utilsApi";
import { TFormValues } from "./types";

const onRegisterRequest = (form: TFormValues) =>
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

const onLoginRequest = (form: TFormValues) =>
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

const onLogOutRequest = () =>
  request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

  const refreshTokenRequest = () =>
  request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

const forgotPasswordRequest = (form: TFormValues) =>
  request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
    }),
  });

const resetPasswordRequest = (form: TFormValues) =>
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
