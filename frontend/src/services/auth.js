import axios from "axios";

const url = "http://localhost:4000/auth";

//--Signin
export const login = (data) => {
  return axios({
    withCredentials: true,
    url: `${url}/login`,
    method: "POST",
    data,
  });
};

//--SignUp
export const register = (data) => {
  return axios({
    url: `${url}/register`,
    method: "POST",
    data,
  });
};
