import { BASE_URL, TOKEN_LIFETIME } from "./сonstant";
import { refreshTokenRequest } from "./authApi";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const requestWithRefresh = async (endpoint, options) => {
  try {
    const res = await request(endpoint, options);
    return await res;
  } catch (err) {
    if (err.message === "jwt malformed") {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      saveTokens(refreshData.accessToken, refreshData.refreshToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await request(endpoint, options);
      return await res;
    } else {
      deleteCookie("token");
      deleteCookie("refreshToken");
      return Promise.reject(err);
    }
  }
};

export function setCookie(name, value, props = {}) {
  props = { path: "/", ...props };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function saveTokens(accessToken, refreshToken) {
  setCookie("token", accessToken.split("Bearer ")[1], {
    expires: TOKEN_LIFETIME,
  });
  setCookie("refreshToken", refreshToken);
}

export function checkAuthorizationToken() {
  const checkTokenResult =
    Boolean(getCookie("refreshToken")) && Boolean(getCookie("token"));
  return checkTokenResult || false;
}

export function checkToken() {
  const checkTokenResult = Boolean(getCookie("token"));
  return checkTokenResult || false;
}

export function checkRefreshToken() {
  const checkTokenResult = Boolean(getCookie("refreshToken"));
  return checkTokenResult || false;
}
