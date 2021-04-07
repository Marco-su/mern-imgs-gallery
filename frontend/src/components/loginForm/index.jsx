//--Imports
import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { login } from "../../services/auth";
import context from "../../services/context";

const LoginForm = ({ history }) => {
  //...States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const { setIsLogged } = useContext(context);

  //...Signin function
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    login(data)
      .then((res) => {
        if (res.data.success) {
          const user = {
            username: res.data.username,
            images: res.data.images,
          };

          window.localStorage.setItem("user", JSON.stringify(user));

          setIsLogged(true);

          history.push("/");
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
          required
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-success">SignIn</button>
      </form>
    </div>
  );
};

//--Export
export default withRouter(LoginForm);
