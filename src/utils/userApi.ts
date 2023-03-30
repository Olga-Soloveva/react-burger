import { requestWithRefresh } from "./utilsApi";
import { getCookie } from "./utilsApi";
import { TFormValues } from "./types";

const getUserRequest = () =>
  requestWithRefresh("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });

const editUserRequest = (form: TFormValues) =>
  requestWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  });

export { getUserRequest, editUserRequest };
