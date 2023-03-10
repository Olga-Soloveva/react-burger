import {
  onRegister,
  onLogin,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "./authApi";
import { setCookie } from "./utilsApi";

export function useProvideAuth() {
  const signUp = async (form) => {
    const data = await onRegister(form).then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1], {
        expires: 1200,
      });
      setCookie("refreshToken", res.refreshToken);
      return res.user;
    });
    return data;
  };

  const signIn = async (form) => {
    const data = await onLogin(form).then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1], {
        expires: 1200,
      });
      setCookie("refreshToken", res.refreshToken);
      return res.user;
    });
    return data;
  };

  const forgotPassword = async (form) => {
    return await forgotPasswordRequest(form)
      .then((res) => {
        return res;
      })
  };

  const resetPassword = async (form) => {
    return await resetPasswordRequest(form)
      .then((res) => {
        return res
      })
      .catch((res) => {
        return res;
      });
  };

  return {
    signUp,
    signIn,
    forgotPassword,
    resetPassword,
  };
}
