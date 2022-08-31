import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../Auth";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../../store";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector(selectors.getLoginRes);

  useEffect(() => {
    if ("user" in res) {
      localStorage.setItem("jwt", res.user.token);
      setAuth(true);
      navigate("/");
    }
  }, [res, navigate, setAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      effects.postUserLogin({
        user: {
          email,
          password,
        },
      })
    );
  };

  return (
    <>
      <div className="myContainer">
        <h1 className="header-text">Sign In</h1>
        <Link to="/register" className="form-link">
          Need an account?
        </Link>
        {res.errors && (
          <p className="errorText">Email or password is invalid.</p>
        )}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </fieldset>
          <button className="form-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
