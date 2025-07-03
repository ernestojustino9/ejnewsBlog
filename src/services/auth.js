import Cookies from "js-cookie";

export const TOKEN_KEY = "etakos@token";
export const USER_KEY = "etakos@user";

export const isAuthenticated = () => Cookies.get(TOKEN_KEY) != null;
export const getToken = () => Cookies.get(TOKEN_KEY);

export const entrar = (accessToken) => {
  Cookies.set(TOKEN_KEY, accessToken);
};

export const sair = () => {
  Cookies.remove(USER_KEY);
  Cookies.remove(TOKEN_KEY);
};