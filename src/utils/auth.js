import {
  onRegisterRequest,
  onLoginRequest,
  onLogOutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "./authApi";
import { setCookie, deleteCookie } from "./utilsApi";

export function useProvideAuth() {
  const onRegister = async (form) => {
    const data = await onRegisterRequest(form).then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1], {
        expires: 1200,
      });
      setCookie("refreshToken", res.refreshToken);
      return res.user;
    });
    return data;
  };

  const onLogin = async (form) => {
    const data = await onLoginRequest(form).then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1], {
        expires: 1200,
      });
      setCookie("refreshToken", res.refreshToken);
      return res.user;
    });
    return data;
  };

  const onLogOut = async () => {
    return await onLogOutRequest()
      .then((res) => {
        return res;
      })
      .finally(() => {
        deleteCookie("token");
        deleteCookie("refreshToken");
      });
  };

  const forgotPassword = async (form) => {
    return await forgotPasswordRequest(form).then((res) => {
      return res;
    });
  };

  const resetPassword = async (form) => {
    return await resetPasswordRequest(form).then((res) => {
      return res;
    });
  };

  return {
    onRegister,
    onLogin,
    forgotPassword,
    resetPassword,
    onLogOut,
  };
}
