import LoginForm from "../components/loginForm";
import { IsNotAutheticated } from "../components/isAuthenticated/IsAuthenticated";

const Login = () => {
  return <IsNotAutheticated Component={LoginForm} />;
};

export default Login;
