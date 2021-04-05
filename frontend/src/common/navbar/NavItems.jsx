import Item from "./Item";

const NavItems = () => {
  //...Logout function
  const logout = () => {
    localStorage.removeItem("auth");
  };

  //...Logged
  if (window.localStorage.getItem("auth"))
    return (
      <>
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
export default NavItems;
