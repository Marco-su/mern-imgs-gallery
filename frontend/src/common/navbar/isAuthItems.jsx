import Item from "./Item";

const NavItems = () => {
  const auth = window.localStorage.getItem("auth");

  if (auth)
    return (
      <li className="nav-item">
        <button className="logout-button nav-link">Logout</button>
      </li>
    );

  return (
    <>
      <Item text="Home" to="/" />
      <Item text="Login" to="/login" />
      <Item text="Register" to="/register" />
    </>
  );
};

export default NavItems;
