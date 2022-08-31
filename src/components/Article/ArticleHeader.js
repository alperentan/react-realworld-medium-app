import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ArticleBody from "./ArticleBody";

const ArticleHeader = (data) => {
  const [mydata, setMydata] = useState(data.data);
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [firstButton, setfirstButton] = useState("Loading...");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [firstButtonClass, setfirstButtonClass] = useState(
    "articleHeaderFollowButton"
  );
  const [secondButton, setsecondButton] = useState("Loading...");
  const [secondButtonClass, setsecondButtonClass] = useState(
    "articleFavoriteButton"
  );
  var [isUser, setIsUser] = useState(false);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    if (!token) {
      setfirstButton(`Follow ${author}`);
    }
    //mevcut kullaniciyi cektigimiz api fonksiyonu
    async function currentUser() {
      return fetch(`https://api.realworld.io/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }).then((data) => data.json());
    }
    //mevcut kullanici giris yapmissa ve article kullaniciya ait isearticle sayfasindaki butonlari edit-delete seklinde degistiriyoruz.
    const response2 = async () => {
      const myrespon = await currentUser();
      if ("user" in myrespon) {
        setMydata(myrespon.user);
        if (myrespon.user.username === author) {
          setIsUser(true);
          if (isUser) {
            setfirstButton("Edit Article");
            setfirstButtonClass("editArticleButton");
            setsecondButton("Delete Article");
            setsecondButtonClass("deleteArticleButton");
          }
        }
      }
    };
    if (token) {
      response2();
    }

    //article bilgilerini cektigimiz api fonksiyonu
    const getArticle = async () => {
      try {
        fetch(`https://api.realworld.io/api/articles/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((data) =>
          data.json().then((data) => {
            if ("article" in data) {
              setArticle(data.article);
              setTitle(data.article.title);
              setAuthor(data.article.author.username);
              setAuthorImage(data.article.author.image);
              setCreatedAt(data.article.createdAt);
              setFavoritesCount(data.article.favoritesCount);
              if (!isUser) {
                setsecondButton(`Favorite Article(${favoritesCount})`);
              }
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    //article headerdaki yazari ekledigimiz api fonksiyonu
    const getUser = async () => {
      try {
        fetch(`https://api.realworld.io/api/profiles/${author}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }).then((data) =>
          data.json().then((data) => {
            if ("profile" in data) {
              if (!isUser) {
                if (data.profile.following) {
                  setfirstButton(`Unfollow ${author}`);
                } else {
                  setfirstButton(`Follow ${author}`);
                }
              }
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getUser();
    }

    //articledan favoriye ekleyip eklemedigimizi cekmek icin kullandigimiz ikinci api fonksiyonu
    const getArticleToken = async () => {
      try {
        fetch(`https://api.realworld.io/api/articles/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }).then((data) =>
          data.json().then((data) => {
            if ("article" in data) {
              setArticle(data.article);
              setTitle(data.article.title);
              setDescription(data.article.description);
              setBody(data.article.body);
              setTagList(data.article.tagList);
              setAuthor(data.article.author.username);
              setAuthorImage(data.article.author.image);
              setCreatedAt(data.article.createdAt);
              setFavoritesCount(data.article.favoritesCount);
              if (!isUser) {
                if (data.article.favorited) {
                  setsecondButton(`Unfavorite Article(${favoritesCount})`);
                } else {
                  setsecondButton(`Favorite Article(${favoritesCount})`);
                }
              }
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getArticleToken();
    } else {
      getArticle();
    }
  }, [id, token, author, favoritesCount, mydata, isUser]);

  //article headerdaki yazari takip etmeyi ve takipten kaldirmayi saglayan api fonksiyonu
  async function followUser(state) {
    return fetch(`https://api.realworld.io/api/profiles/${author}/follow`, {
      method: `${state}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }

  //article header'daki favori butonuna tiklandiginda calisan api fonksiyonu
  async function articleFunc(state) {
    return fetch(`https://api.realworld.io/api/articles/${id}/favorite`, {
      method: `${state}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }
  async function articleFuncDelete() {
    return fetch(`https://api.realworld.io/api/articles/${id}`, {
      method: `DELETE`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
    }).then((data) => data.json());
  }

  //follow-unfollow ve edit article buttonuna tiklandiginda calisan fonksiyon
  const firstButtonClick = async () => {
    if (token) {
      if (firstButton.includes("Follow")) {
        const response = await followUser("POST");
        if ("profile" in response) {
          setfirstButton(`Unfollow ${author}`);
          setfirstButtonClass("articleHeaderunFollowButton");
        }
      } else if (firstButton.includes("Unfollow")) {
        const response = await followUser("DELETE");
        if ("profile" in response) {
          setfirstButton(`Follow ${author}`);
          setfirstButtonClass("articleHeaderFollowButton");
        }
      } else if (firstButton.includes("Edit")) {
        navigate(`/editor/${id}`, {
          state: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
          },
        });
      }
    } else {
      navigate("/login");
    }
  };

  //favorite-unfavorite ve delete article buttonuna tiklandiginda calisan fonksiyon
  const secondButtonClick = async (e) => {
    e.preventDefault();
    if (token) {
      if (secondButton.includes("Favorite")) {
        const response = await articleFunc("POST");
        if ("article" in response) {
          setsecondButton(`Unfavorite Article(${favoritesCount + 1})`);
          setsecondButtonClass("unfavoriteArticleButton");
          setFavoritesCount(favoritesCount + 1);
        }
      } else if (secondButton.includes("Unfavorite")) {
        const response = await articleFunc("DELETE");
        if ("article" in response) {
          setsecondButton(`Favorite Article(${favoritesCount - 1})`);
          setsecondButtonClass("articleFavoriteButton");
          setFavoritesCount(favoritesCount - 1);
        }
      } else if (secondButton.includes("Delete")) {
        const response = await articleFuncDelete();
        if ("error" in response) {
          console.log(response.error);
        } else {
          alert("Article deleted");
          navigate("/");
        }
      }
    } else {
      navigate("/login");
    }
  };

  return title ? (
    <>
      <div className="article-top">
        <div className="container">
          <h1 className="article-header">{title}</h1>
          <div className="wrapper">
            <Link to={`/@${author}`} className="author-image">
              <img src={authorImage} alt={author} />
            </Link>
            <div className="article-info">
              <Link to={`/@${author}`} className="author-name">
                {author}
              </Link>
              <span className="date">{new Date(createdAt).toDateString()}</span>
            </div>
            <button className={firstButtonClass} onClick={firstButtonClick}>
              {firstButton}
            </button>
            <button className={secondButtonClass} onClick={secondButtonClick}>
              {secondButton}
            </button>
          </div>
        </div>
      </div>
      <ArticleBody data={article} user={mydata} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ArticleHeader;
