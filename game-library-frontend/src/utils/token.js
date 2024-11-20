import { tempTokenKey } from "./constants";
export const setToken = (token) => localStorage.setItem(tempTokenKey, token);

export const getToken = () => {
  return localStorage.getItem(tempTokenKey);
};

export const removeToken = () => {
  localStorage.removeItem(tempTokenKey);
};
