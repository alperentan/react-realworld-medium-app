import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../../store";

const Register = () => {
  const [username, setusername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector(selectors.getRegisterRes);

  useEffect(() => {
    if ("user" in res) {
      alert("Register success");
      navigate("/login");
    }
  }, [res, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      effects.postUsers({
        user: {
          username,
          email,
          password,
        },
      })
    );
  };

  return (
    <>
      <div className="myContainer">
        <h1 className="header-text">Sign Up</h1>
        <Link to="/login" className="form-link">
          Have an account?
        </Link>
        {res.errors && res.errors.username && (
          <p className="errorText">Username {res.errors.username}</p>
        )}
        {res.errors && res.errors.email && (
          <p className="errorText">Email {res.errors.email}</p>
        )}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              onChange={(e) => setusername(e.target.value)}
            ></input>
          </fieldset>
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
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
