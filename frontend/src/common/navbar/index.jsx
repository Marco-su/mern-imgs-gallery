//--Imports
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import NavItems from "./NavItems";
import context from "../../services/context";

const Navbar = () => {
  //...States
  const { setIsLogged } = useContext(context);

  //...Is autheticated function to start or restart application
  useEffect(() => {
    const abortController = new AbortController();

    if (window.localStorage.getItem("auth")) setIsLogged(true);

    return abortController.abort();
  }, [setIsLogged]);

  //...Render
  return (
    <nav
      id="main-navbar"
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Images Up
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar-options"
          aria-controls="main-navbar-options"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar-options">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <NavItems />
          </ul>
        </div>
      </div>
    </nav>
  );
};

//--Export
export default Navbar;
