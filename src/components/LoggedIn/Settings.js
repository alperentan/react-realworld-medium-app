import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../Auth";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../../store";

const Settings = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const res = useSelector(selectors.getUpdateUserRes);
  const currentUserRes = useSelector(selectors.getCurrentUserRes);
  const [imageUrl, setimageUrl] = useState();
  const [username, setUsername] = useState(currentUserRes.user.username);
  const [error, setError] = useState(false);
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  //browserdan token alınıyor
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if ("user" in res && currentUserRes.user.username !== res.user.username) {
      localStorage.setItem("jwt", res.user.token);
      dispatch(effects.getUser(token));
      navigate(`/@${username}`);
    } else if (res.errors) {
      setError(true);
    }
  }, [res, currentUserRes, navigate, username, token, dispatch]);

  //guncelleme butonuna tiklandiginda cagirilan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      effects.putUser(
        {
          user: {
            email: email,
            username: username,
            bio: bio,
            image: imageUrl,
            password: password,
          },
        },
        token
      )
    );
  };

  //cikis yapmak icin kullanilan fonksiyon
  const onClickLogout = () => {
    localStorage.removeItem("jwt");
    setAuth(false);
    navigate("/");
  };
  return (
    <div className="myContainer">
      <h1 className="header-text">Your Settings</h1>
      {error && <p className="errorText">Something went wrong.</p>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            type="text"
            placeholder="URL of profile picture"
            className="form-input"
            defaultValue={currentUserRes.user.image}
            onChange={(e) => setimageUrl(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            defaultValue={currentUserRes.user.username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <textarea
            placeholder="Short bio about you"
            className="form-input"
            rows="8"
            defaultValue={currentUserRes.user.bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </fieldset>
        <fieldset>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            defaultValue={currentUserRes.user.email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <input
            type="password"
            placeholder="New Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </fieldset>
        <button className="form-button" type="submit">
          Update Settings
        </button>
        <br />
        <button className="logout-button" onClick={onClickLogout}>
          Or click here to logout.
        </button>
      </form>
    </div>
  );
};

export default Settings;
