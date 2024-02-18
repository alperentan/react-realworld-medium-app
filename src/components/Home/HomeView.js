import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeView = () => {
  const token = localStorage.getItem("jwt");
  const [username, setUsername] = useState();
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [yourFeedClassName, setyourFeedClassName] = useState(
    "nav-item active-nav"
  );
  const [globalFeedClassName, setglobalFeedClassName] = useState("nav-item");
  //global feed articlelarini ceken api fonksiyonu
  async function getGlobalArticles() {
    return fetch(`https://api.realworld.io/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  }
  async function getGlobalArticlesToken() {
    return fetch(`https://api.realworld.io/api/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }
  //feed articlelarini ceken api fonksiyonu
  async function getFeedArticles() {
    return fetch(`https://api.realworld.io/api/articles/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }

  useEffect(() => {
    //mevcut giris yapan kullaniciyi api den aliyoruz
    async function getCurrentUser() {
      return fetch(`https://api.realworld.io/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }).then((data) => data.json());
    }
    //mevcut giris yapan kullaniciyi cekme fonksiyonu
    const ress = async () => {
      if (token) {
        const myrespon = await getCurrentUser();
        if ("user" in myrespon) {
          setUsername(myrespon.user.username);
        }
      }
    };
    ress();
    //global article icin cagirilan fonksiyon
    const response = async () => {
      if (token) {
        const myrespon = await getGlobalArticlesToken();
        if ("articles" in myrespon) {
          setArticles(myrespon.articles);
        } else {
          console.log("error");
        }
      } else {
        const myrespon = await getGlobalArticles();
        if ("articles" in myrespon) {
          setArticles(myrespon.articles);
        } else {
          console.log("error");
        }
      }
    };

    //feed article icin cagirilan fonksiyon,
    const myres = async () => {
      const myrespon = await getFeedArticles();
      if ("articles" in myrespon) {
        setArticles(myrespon.articles);
      } else {
        console.log("error");
      }
    };
    if (token) {
      myres();
    } else {
      response();
    }

    //populer taglari ceken api fonksiyonu
    async function getTags() {
      return fetch(`https://api.realworld.io/api/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
    }

    //populer taglari cekme fonksiyonu
    const responseTags = async () => {
      const myrespon = await getTags();
      if ("tags" in myrespon) {
        setTags(myrespon.tags);
      } else {
        console.log("error");
      }
    };
    responseTags();
  }, [token]);

  //populer tag kisminda tag tiklamasi gerceklesinde cagirilan api fonksiyonu. Feed articlelarini tag'e gore yeniden cekiyor.
  async function getArticlesByTag(mytag) {
    return fetch(`https://api.realworld.io/api/articles?tag=${mytag.mytag}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  }
  //populer tag kisminda tag tiklamasi gerceklesinde cagirilan fonksiyon
  const responseArticlesByTag = async (mytag) => {
    const myrespon = await getArticlesByTag(mytag);
    if ("articles" in myrespon) {
      setArticles(myrespon.articles);
    } else {
      console.log("error");
    }
  };
  //global feed'e tiklandiginda cagirilan fonksiyon, icerisinde api istegi atiliyor.
  const getGlobalFeed = async () => {
    if (token) {
      const myrespon = await getGlobalArticlesToken();
      if ("articles" in myrespon) {
        setArticles(myrespon.articles);
      } else {
        console.log("error");
      }
    } else {
      const myrespon = await getGlobalArticles();
      if ("articles" in myrespon) {
        setArticles(myrespon.articles);
      } else {
        console.log("error");
      }
    }
  };
  //your feed'e tiklaninca cagirilan fonksiyon
  const getYourFeed = async () => {
    const myrespon = await getFeedArticles();
    if ("articles" in myrespon) {
      setArticles(myrespon.articles);
    } else {
      console.log("error");
    }
  };
  //favori butonuna tiklandiginda cagirilan api fonksiyonu, kullanici login olmus ise calisiyor, login degilse login sayfasina yonlendiriyor
  async function articleFunc(state, articleID) {
    if (token) {
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
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="mycontainerr page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="homeview-ul">
                {token ? (
                  <li
                    className={yourFeedClassName}
                    onClick={() => {
                      getYourFeed();
                      setyourFeedClassName("nav-item active-nav");
                      setglobalFeedClassName("nav-item");
                    }}
                  >
                    Your Feed
                  </li>
                ) : (
                  <></>
                )}
                <li
                  className={globalFeedClassName}
                  onClick={() => {
                    getGlobalFeed();
                    setglobalFeedClassName("nav-item active-nav");
                    setyourFeedClassName("nav-item");
                  }}
                >
                  Global Feed
                </li>
              </ul>
              <hr />
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
                      <button
                        className={
                          article.favorited ? "article-unfav" : "article-fav"
                        }
                        onClick={() =>
                          articleFunc(
                            article.favorited ? "DELETE" : "POST",
                            article.slug
                          )
                        }
                      >
                        {article.favoritesCount}
                      </button>
                      <Link
                        to={`/article/${article.slug}`}
                        className="article-preview-link"
                      >
                        <h1 className="preview-title">{article.title}</h1>
                        <p className="preview-desc">{article.description}</p>
                        <span>Read more...</span>
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
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {tags.map((mytag) => {
                const handleClick = (ev) => {
                  ev.preventDefault();
                  responseArticlesByTag({ mytag });
                };

                return (
                  <button
                    className="sidebar-tags"
                    key={mytag}
                    onClick={handleClick}
                  >
                    {mytag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
