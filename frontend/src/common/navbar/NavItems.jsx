import { useContext } from "react";
import { withRouter } from "react-router-dom";
import context from "../../services/context";
import Item from "./Item";

const NavItems = ({ history }) => {
  const { isLogged, setIsLogged } = useContext(context);

  //...Logout function
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    history.push("/");
    setIsLogged(false);
  };

  //...Logged
  if (isLogged)
    return (
      <>
        <Item text="Home" to="/" />
        <Item text="Upload" to="/upload" />
        <li className="nav-item">
          <button className="logout-button nav-link" onClick={logout}>
            Logout
          </button>
        </li>
      </>
    );

  //...Unlogged
  return (
    <>
      <Item text="Home" to="/" />
      <Item text="Login" to="/login" />
      <Item text="Register" to="/register" />
    </>
  );
};

//--Export
export default withRouter(NavItems);
