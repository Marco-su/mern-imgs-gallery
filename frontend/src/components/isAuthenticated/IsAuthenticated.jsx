import { Redirect } from "react-router-dom";

export const IsAuthenticated = ({ Component }) => {
  if (window.localStorage.getItem("auth")) {
    return <Component />;
  }

  return <Redirect to="/login" />;
};

export const IsNotAutheticated = ({ Component }) => {
  if (!window.localStorage.getItem("auth")) {
    return <Component />;
  }

  return <Redirect to="/" />;
};
