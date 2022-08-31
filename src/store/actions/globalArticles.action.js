export const GET_ARTICLES = "[Articles] Get Articles";
export const GET_ARTICLES_SUCCESS = "[Articles] Get Articles Success";
export const GET_ARTICLES_FAIL = "[Articles] Get Articles Fail";

export const getArticles = () => ({
  type: GET_ARTICLES,
});

export const getArticlesSuccess = (payload) => ({
  type: GET_ARTICLES_SUCCESS,
  payload,
});

export const getArticlesFail = (payload) => ({
  type: GET_ARTICLES_FAIL,
  payload,
});
