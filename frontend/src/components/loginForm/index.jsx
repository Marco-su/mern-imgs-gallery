//--Imports
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

const LoginForm = () => {
  //...States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [successLogin, setSuccessLogin] = useState(false);

  //...Signin function
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    login(data)
      .then((res) => {
        if (res.data.success) {
          window.localStorage.setItem("auth", res.data.token);
          setSuccessLogin(true);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch(() => setMessage("Login error"));
  };

  //...Render
  return (
    <div id="login-form" className="container my-3">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {message ? (
          <span className="text-danger d-block">{message}</span>
        ) : null}

        <input
          className="form-control mb-2"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">SignIn</button>
      </form>

      {successLogin ? <Redirect to="/" /> : null}
    </div>
  );
};

//--Export
export default LoginForm;
