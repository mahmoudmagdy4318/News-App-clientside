import axiosInstance from "../API/axiosInstance";
import { removeToken } from "./tokenService";

//service to register user's data
const register = (userData) => {
  return axiosInstance.post("signup", userData);
};
//login service
const login = (userData) => {
  return axiosInstance.post("login", userData);
};
//logout service
const logout = () => {
  removeToken();
};
export { register, login, logout };
