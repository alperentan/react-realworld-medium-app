import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../store";

const Profile = () => {
  const navigate = useNavigate();
  //linkten kullanici adi parametresini aliyoruz
  const { username } = useParams();
  const [profile, setProfile] = useState();
  const token = localStorage.getItem("jwt");
  const [buttonText, setButtonText] = useState(`Follow ${username}`);
  const [articles, setArticles] = useState([]);
  const [myArticlesClassName, setmyArticlesClassName] = useState(
    "nav-item active-nav"
  );
  const [favArticlesClassName, setfavArticlesClassName] = useState("nav-item");

  const dispatch = useDispatch();
  const res = useSelector(selectors.getProfileRes);

  //sayfada degisiklik olursa yeni verileri aliyoruz
  useEffect(() => {
    dispatch(effects.getProfile(username, token));
    var isUser = false;
    //mevcut giris yapan kullaniciyi api den aliyoruz
    async function currentUser() {
      return fetch(`https://api.realworld.io/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }).then((data) => data.json());
    }

    //eger linkteki kullanici ile giris yapan kullanici ayni ise butonu ayarlar butonuna ceviriyoruz
    const response2 = async () => {
      const myrespon = await currentUser();
      if ("user" in myrespon) {
        if (myrespon.user.username === username) {
          isUser = true;
          setButtonText("Edit Profile Settings");
        }
      }
    };
    if (token) {
      response2();
    }

    setProfile(res);
    if (!isUser) {
      if (res.following) {
        setButtonText(`Unfollow ${username}`);
      }
    }
    getmyArticles();
  }, [username, token]);

  //takip et butonuna tikaninca cagirilan api fonksiyonu. Unfollow ya da follow a gore method degistiriyor. follow=post, unfollow=delete
  async function followUser(state) {
    return fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
      method: `${state}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }
  //butona tıklanınca cagirilan fonksiyon
  const followUserButton = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else if (buttonText === "Edit Profile Settings") {
      navigate("/settings");
    } else if (buttonText === `Follow ${username}`) {
      const state = "POST";
      const response = await followUser(state);
      if ("errors" in response) {
        alert("Follow failed");
      } else if ("profile" in response) {
        alert("Follow successfull");
        setButtonText(`Unfollow ${username}`);
      }
    } else {
      const state = "DELETE";
      const response = await followUser(state);
      if ("errors" in response) {
        alert("Unfollow failed");
      } else if ("profile" in response) {
        alert("Unfollow successfull");
        setButtonText(`Follow ${username}`);
      }
    }
  };
  //linkteki kullanicinin favoriledigi articlelarini alan api fonksiyonu
  async function favArticles() {
    return fetch(
      `https://api.realworld.io/api/articles?favorited=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }
    ).then((data) => data.json());
  }
  async function favArticlesnoAuth() {
    return fetch(
      `https://api.realworld.io/api/articles?favorited=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
  }
  //favori articlelar butonuna tıklandıgında cagirilan fonksiyon
  const getFavArticles = async () => {
    if (token) {
      const response = await favArticles();
      if ("articles" in response) {
        setArticles(response.articles);
      }
    } else {
      const response = await favArticlesnoAuth();
      if ("articles" in response) {
        setArticles(response.articles);
      }
    }
  };
  //my articles butonuna tıklandıgında cagirilan api fonksiyonu
  async function myArticleFunc() {
    return fetch(`https://api.realworld.io/api/articles?author=${username}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }
  async function myArticleFuncnoAuth() {
    return fetch(`https://api.realworld.io/api/articles?author=${username}`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  }
  //my articles butonuna tiklandiginda cagirilan fonksiyon
  const getmyArticles = async () => {
    if (token) {
      const response = await myArticleFunc();
      if ("articles" in response) {
        setArticles(response.articles);
      }
    } else {
      const response = await myArticleFuncnoAuth();
      if ("articles" in response) {
        setArticles(response.articles);
      }
    }
  };
  //bir article favori olarak isaretlenmek istenildiginde cagirilan api fonksiyonu
  async function articleFunc(state, articleID) {
    return fetch(
      `https://api.realworld.io/api/articles/${articleID}/favorite`,
      {
        method: `${state}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }
    ).then((data) => data.json());
  }
  return profile ? (
    <>
      <div className="userInfo">
        <div className="profileContainer">
          <div className="profileWrapper">
            <img src={res.image} className="userImgInfo" alt=""></img>
            <h4 className="userNameInfo">{res.username}</h4>
            <p className="userBioInfo">{res.bio}</p>
            <button className="profile-button" onClick={followUserButton}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <div className="mycontainerr page">
        <div className="row">
          <div className="col-md-9">
            <ul className="homeview-ul">
              <li
                className={myArticlesClassName}
                onClick={() => {
                  getmyArticles();
                  setmyArticlesClassName("nav-item active-nav");
                  setfavArticlesClassName("nav-item");
                }}
              >
                My Articles
              </li>
              <li
                className={favArticlesClassName}
                onClick={() => {
                  getFavArticles();
                  setfavArticlesClassName("nav-item active-nav");
                  setmyArticlesClassName("nav-item");
                }}
              >
                Favorited Articles
              </li>
            </ul>
            {articles.length === 0 ? (
              <div>No articles are here... yet.</div>
            ) : (
              articles.map((article) => {
                return (
                  <div key={article.slug}>
                    <Link to={`/@${article.author.username}`}>
                      <img
                        src={article.author.image}
                        alt={article.author.username}
                        className="preview-image"
                      />
                    </Link>
                    <Link
                      to={`/@${article.author.username}`}
                      className="preview-author-name"
                    >
                      {article.author.username}
                    </Link>
                    <span className="preview-date">
                      {new Date(article.createdAt).toDateString()}
                    </span>
                    <Link
                      to={`/article/${article.slug}`}
                      className="article-preview-link"
                    >
                      <h1 className="preview-title">{article.title}</h1>
                      <p className="preview-desc">{article.description}</p>
                      <span>Read more...</span>
                    </Link>
                    <button
                      className={
                        article.favorited ? "article-unfav" : "article-fav"
                      }
                      onClick={() => {
                        token
                          ? articleFunc(
                              article.favorited ? "DELETE" : "POST",
                              article.slug
                            )
                          : navigate("/login");
                      }}
                    >
                      {article.favoritesCount}
                    </button>
                    <Link to={`/article/${article.slug}`}>
                      {article.tagList.map((tag) => {
                        return (
                          <li className="article-tags" key={tag}>
                            {tag}
                          </li>
                        );
                      })}
                    </Link>

                    <hr />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
