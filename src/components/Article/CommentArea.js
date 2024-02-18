import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { Link } from "react-router-dom";

const CommentAreaInput = (data) => {
  const userData = data.data;
  const articleData = data.articleData;
  const id = articleData.slug;
  const token = localStorage.getItem("jwt");
  const [userComment, setuserComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    //article comment'lari api'den cektigimiz fonksiyon
    async function getComments() {
      return fetch(`https://api.realworld.io/api/articles/${id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      }).then((data) => data.json());
    }
    const commentResponse = async () => {
      const myrespon = await getComments();
      console.log(myrespon);
      if ("comments" in myrespon) {
        setComments(myrespon.comments);
      }
    };
    commentResponse();
  }, [id, token]);

  //olusturulan comment'i api'ye gonderme fonksiyonu
  async function createComment(state, credentials) {
    return fetch(`https://api.realworld.io/api/articles/${id}/comments`, {
      method: `${state}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const commentCreateButton = async (e) => {
    e.preventDefault();
    const response = await createComment("POST", {
      comment: {
        body: userComment,
      },
    });
    if ("comment" in response) {
      setuserComment("");
      alert("Comment created");
    } else if ("errors" in response) {
      alert("Comment failed");
    }
  };
  return localStorage.getItem("jwt") && userData ? (
    <>
      <div className="comment-card">
        <div className="comment-input-card">
          <textarea
            className="comment-input"
            placeholder="Write a comment..."
            rows="3"
            value={userComment}
            onChange={(e) => setuserComment(e.target.value)}
          ></textarea>
          <div className="card-bottom">
            <img
              src={userData.image}
              className="comment-user-img"
              alt={userData.username}
            />
            <button
              className="btn btn-sm btn-primary"
              onClick={commentCreateButton}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            userData={userData}
            slug={id}
          />
        );
      })}
    </>
  ) : (
    <>
      <div className="comment-card">
        <div className="comment-input-card">
          <Link to="/login" className="form-link">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/register" className="form-link">
            Sign up
          </Link>{" "}
          to add comments on this article.
        </div>
      </div>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            userData={userData}
            slug={id}
          />
        );
      })}
    </>
  );
};

export default CommentAreaInput;
