import RegisterForm from "../components/registerForm";
import { IsNotAutheticated } from "../components/isAuthenticated/IsAuthenticated";

const Register = () => {
  return <IsNotAutheticated Component={RegisterForm} />;
};

export default Register;
