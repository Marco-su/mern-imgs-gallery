import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const IsAuthenticated = ({ Component }) => {
  if (Cookies.get("authConfirm")) {
    return <Component />;
  }

  return <Redirect to="/login" />;
};

export const IsNotAutheticated = ({ Component }) => {
  if (!Cookies.get("authConfirm")) {
    return <Component />;
  }

  return <Redirect to="/" />;
};
