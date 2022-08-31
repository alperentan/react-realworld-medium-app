export const POST_ARTICLES = "[Article] Post Articles";
export const POST_ARTICLES_SUCCESS = "[Article] Post Articles Success";
export const POST_ARTICLES_FAIL = "[Article] Post Articles Fail";

export const postArticles = () => ({
  type: POST_ARTICLES,
});

export const postArticlesSuccess = (payload) => ({
  type: POST_ARTICLES_SUCCESS,
  payload,
});

export const postArticlesFail = (payload) => ({
  type: POST_ARTICLES_FAIL,
  payload,
});
