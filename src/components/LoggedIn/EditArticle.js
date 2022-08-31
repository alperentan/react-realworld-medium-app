import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditArticle = (data) => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state.body);
  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [body, setBody] = useState(state.body);
  const [tagList, setTagList] = useState(state.tagList);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  //rticle editlemek icin kullanilan api fonksiyonu
  async function editArticle(credentials) {
    return fetch(`https://api.realworld.io/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleSubmit = async () => {
    const response = await editArticle({
      article: {
        title,
        description,
        body,
        tagList,
      },
    });
    if ("errors" in response) {
      alert("Publishing failed");
      console.log(response);
    } else if ("article" in response) {
      alert("Publishing success");
      console.log(response.article.slug);
      navigate(`/article/${response.article.slug}`);
    }
  };
  return (
    <div className="myContainer">
      <fieldset>
        <input
          type="text"
          placeholder="Article Title"
          className="form-input-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </fieldset>
      <fieldset>
        <input
          type="text"
          placeholder="What's this article about?"
          className="form-input-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </fieldset>
      <fieldset>
        <textarea
          type="text"
          rows="8"
          placeholder="Write your article (in markdown)"
          className="form-input-lg"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </fieldset>
      <fieldset>
        <input
          type="text"
          rows="8"
          placeholder="Enter tags"
          className="form-input-lg"
          value={tagList}
          onChange={(e) => setTagList(e.target.value)}
        ></input>
      </fieldset>

      <button className="form-button" type="button" onClick={handleSubmit}>
        Publish Article
      </button>
    </div>
  );
};

export default EditArticle;
