import * as services from "../service";
import * as actions from "../actions";

const postArticles = (credentials, token) => {
  return async (dispatch) => {
    const { response } = await services.fetchwithAuthwithCred(
      "POST",
      `/articles`,
      credentials,
      token
    );
    dispatch(actions.postArticlesSuccess(response));
  };
};

export { postArticles };
