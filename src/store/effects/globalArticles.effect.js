import * as services from "../service";
import * as actions from "../actions";

const getGlobalArticles = (string, token) => {
  if (token) {
    return async (dispatch) => {
      const { response } = await services.fetchwithAuthnoCred(
        "GET",
        `/articles` + string,
        token
      );
      dispatch(actions.getArticlesSuccess(response));
    };
  } else {
    return async (dispatch) => {
      const { response } = await services.fetchnoAuthnoCred(
        "GET",
        `/articles` + string
      );
      dispatch(actions.getArticlesSuccess(response));
    };
  }
};

export { getGlobalArticles };
