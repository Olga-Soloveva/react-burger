import { request } from "./utilsApi";
import { getCookie } from "./utilsApi";

const onRegister = (form) =>
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

const onLogin = (form) =>
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

  const forgotPasswordRequest = (form) =>
  request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
    }),
  });

  const resetPasswordRequest = (form) =>
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

export { onRegister, onLogin, forgotPasswordRequest, resetPasswordRequest };
