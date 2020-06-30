const jwtDecode = require("jwt-decode");

//getting authorization token from localstorage
const getToken = () => {
  const token = localStorage.getItem("Authorization");
  return token;
};

//setting authenticated user's authorization token in local storage
const setToken = (token) => {
  localStorage.setItem("Authorization", token);
};
//removing authorization token from localstorage
const removeToken = () => {
  localStorage.removeItem("Authorization");
};

//getting and decoding authorization token from localstorage
const decodeToken = () => {
  const token = getToken();
  if (token) {
    const payload = jwtDecode(token);
    return payload;
  }
  throw new Error();
};
export { getToken, setToken, removeToken, decodeToken };
