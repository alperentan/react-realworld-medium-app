import React from "react";
import CommentArea from "./CommentArea.js";

const ArticleBody = (data) => {
  const articleData = data.data;
  const userData = data.user;
  return (
    <>
      <div className="bodyContainer">
        <div className="articleContent">
          <div className="article-body">
            <p>{articleData.body}</p>
          </div>
        </div>
        <ul className="tags">
          {articleData.tagList.map((tag) => {
            return (
              <li className="article-tags" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
        <hr />
      </div>
      <CommentArea data={userData} articleData={articleData} />
    </>
  );
};

export default ArticleBody;
