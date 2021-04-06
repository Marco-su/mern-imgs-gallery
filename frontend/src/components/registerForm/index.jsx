//--Imports
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { register } from "../../services/auth";

const RegisterForm = () => {
  //...States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successRegister, setSuccessRegister] = useState(false);
  const [message, setMessage] = useState(null);

  //...Signup function
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password, username };

    register(data)
      .then((res) => {
        if (res.data.success) {
          setSuccessRegister(true);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error for registration");
      });
  };

  //...Render
  return (
    <div id="register-form" className="container my-3">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {message ? (
          <span className="text-danger d-block">{message}</span>
        ) : null}

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button className="btn btn-success">SignUp</button>

        {successRegister ? <Redirect to="/login" /> : null}
      </form>
    </div>
  );
};

//--Export
export default RegisterForm;
