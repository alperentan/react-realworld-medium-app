import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../../store";

const AuthHeader = () => {
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const res = useSelector(selectors.getCurrentUserRes);
  useEffect(() => {
    dispatch(effects.getUser(token));
  }, [token, dispatch]);

  return res.user ? (
    <>
      <nav className="parent-navbar">
        <div className="navbar-container">
          <NavLink className="navbar-logo" to="/">
            conduit
          </NavLink>
          <ul className="navbar">
            <li className="navbar-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="nav-link" to="/editor">
                New Article
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="nav-link" to="/settings">
                Settings
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="nav-link" to={`/@${res.user.username}`}>
                <img
                  src={res.user.image}
                  className="nav-user-pic"
                  alt={res.user.username}
                />
                {res.user.username}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  ) : (
    <></>
  );
};

export default AuthHeader;
