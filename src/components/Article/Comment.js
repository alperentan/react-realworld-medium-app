import React, { useState } from "react";
import { Link } from "react-router-dom";

const Comment = (data) => {
  const commentData = data.comment;
  const userData = data.userData;
  const token = localStorage.getItem("jwt");
  const id = data.id;
  const [commentID, setCommentID] = useState(commentData.id);

  //article slug'a gore yorumlari silen api fonksiyonu
  async function deleteComment(state) {
    return fetch(
      `https://api.realworld.io/api/articles/${id}/comments/${commentID}`,
      {
        method: `${state}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }
    ).then((data) => data.json());
  }

  //yorum silme butonuna tiklandiginda cagirilan fonksiyon
  const commentDeleteClick = async () => {
    const response = await deleteComment("DELETE", {});
    if (response.status === 200) {
      //success
    } else if ("errors" in response) {
      alert("Comment delete failed");
    }
  };
  return (
    <>
      <div className="comment-card">
        <div className="comment-input-card">
          <p className="comment-text">{commentData.body}</p>
          <div className="card-bottom">
            <img
              src={commentData.author.image}
              className="comments-user-img"
              alt={commentData.author.username}
            />
            <Link
              to={`/@${commentData.author.username}`}
              className="comment-author"
            >
              {commentData.author.username}
            </Link>
            <span className="comment-date">
              {new Date(commentData.createdAt).toDateString()}
            </span>
            {token ? (
              userData.username === commentData.author.username ? (
                <span
                  className="delete-comment"
                  onClick={() => {
                    setCommentID(commentData.id);
                    commentDeleteClick();
                  }}
                >
                  Delete
                </span>
              ) : (
                <div></div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
