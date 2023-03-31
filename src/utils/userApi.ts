import { requestWithRefresh } from "./utilsApi";
import { getCookie } from "./utilsApi";
import { TFormValues } from "./types";
import { TUserData, TUserWithToken } from "./types";

const getUserRequest = (): Promise<TUserWithToken> =>
  requestWithRefresh("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });

const editUserRequest = (form: TFormValues): Promise<TUserData> =>
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
