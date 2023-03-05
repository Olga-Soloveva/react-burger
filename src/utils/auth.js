import { onRegister, onLogin } from "./authApi";
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
    return data
  };

  const signIn = async (form) => {
    const data = await onLogin(form).then((res) => {
      setCookie("token", res.accessToken.split("Bearer ")[1], {
        expires: 1200,
      });
      setCookie("refreshToken", res.refreshToken);
      return res.user;
    });
    return data
  };

  return {
    signUp,
    signIn,
  };
}
