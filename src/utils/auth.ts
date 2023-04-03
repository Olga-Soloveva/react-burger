import {
  onRegisterRequest,
  onLoginRequest,
  onLogOutRequest,
  refreshTokenRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "./authApi";
import { deleteCookie, saveTokens } from "./utilsApi";
import { TFormValues } from "./types";

export function useProvideAuth() {
  const onRegister = async (form: TFormValues) => {
    const data = await onRegisterRequest(form).then((res) => {
      saveTokens(res.accessToken, res.refreshToken)
      return res.user;
    });
    return data;
  };

  const onLogin = async (form: TFormValues) => {
    const data = await onLoginRequest(form).then((res) => {
      saveTokens(res.accessToken, res.refreshToken)
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

  const refreshToken = async () => {
    return await refreshTokenRequest().then((res) => {
      saveTokens(res.accessToken, res.refreshToken)
    });
  };

  const forgotPassword = async (form: TFormValues) => {
    return await forgotPasswordRequest(form).then((res) => {
      return res;
    });
  };

  const resetPassword = async (form: TFormValues) => {
    return await resetPasswordRequest(form).then((res) => {
      return res;
    });
  };

  return {
    onRegister,
    onLogin,
    onLogOut,
    refreshToken,
    forgotPassword,
    resetPassword,
  };
}
