import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, effects } from "../../store";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [published, setPublished] = useState(false);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector(selectors.getNewArticleRes);

  useEffect(() => {
    if (res.status === "error") {
      setErrorMessage(true);
    } else if ("article" in res) {
      if (published) {
        if (res.article.title === title) {
          navigate(`/article/${res.article.slug}`);
          setPublished(false);
        }
      }
    }
  }, [res, navigate, errorMessage, published, title]);

  //article ekleme butonuna tiklandiginda cagirilan fonksiyon
  const handleSubmit = async () => {
    dispatch(
      effects.postArticles(
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        token
      )
    );
    setPublished(true);
  };

  const publishArticle = async () => {
    await handleSubmit();
  };
  return (
    <div className="myContainer">
      {errorMessage && <p className="errorText">{res.message}</p>}
      <fieldset>
        <input
          type="text"
          placeholder="Article Title"
          className="form-input-lg"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </fieldset>
      <fieldset>
        <input
          type="text"
          placeholder="What's this article about?"
          className="form-input-lg"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </fieldset>
      <fieldset>
        <textarea
          type="text"
          rows="8"
          placeholder="Write your article (in markdown)"
          className="form-input-lg"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </fieldset>
      <fieldset>
        <input
          type="text"
          rows="8"
          placeholder="Enter tags  ex: tag1,tag2"
          className="form-input-lg"
          onChange={(e) => setTagList(e.target.value.split(","))}
        ></input>
      </fieldset>

      <button className="form-button" type="button" onClick={publishArticle}>
        Publish Article
      </button>
    </div>
  );
};

export default NewArticle;
