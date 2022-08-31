import * as services from "../service";
import * as actions from "../actions";

const postUserLogin = (credentials) => {
  return async (dispatch) => {
    const { response } = await services.fetchnoAuthwithCred(
      "POST",
      `/users/login`,
      credentials
    );
    /*if (response.errors) {
      return dispatch(actions.postUserLoginFail(response.errors));
    } else if (response.user) {
      return dispatch(actions.postUserLoginSuccess(response.user));
    }*/
    if (response) {
      return dispatch(actions.postUserLoginSuccess(response));
    }
  };
};

export { postUserLogin };
