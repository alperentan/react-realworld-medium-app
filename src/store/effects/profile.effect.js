import * as services from "../service";
import * as actions from "../actions";

const getProfile = (username, token, credentials) => {
  if (token) {
    if (credentials) {
      return async (dispatch) => {
        const { response, error } = await services.fetchwithAuthwithCred(
          "GET",
          `/profiles/${username}`,
          credentials,
          token
        );

        if (error) {
          return dispatch(actions.getProfileFail(error));
        }

        dispatch(actions.getProfileSuccess(response.profile));
      };
    } else {
      return async (dispatch) => {
        const { response, error } = await services.fetchwithAuthnoCred(
          "GET",
          `/profiles/${username}`,
          token
        );

        if (error) {
          return dispatch(actions.getProfileFail(error));
        }

        dispatch(actions.getProfileSuccess(response.profile));
      };
    }
  } else {
    if (credentials) {
      return async (dispatch) => {
        const { response, error } = await services.fetchnoAuthwithCred(
          "GET",
          `/profiles/${username}`,
          credentials
        );

        if (error) {
          return dispatch(actions.getProfileFail(error));
        }

        dispatch(actions.getProfileSuccess(response.profile));
      };
    } else {
      return async (dispatch) => {
        const { response, error } = await services.fetchnoAuthnoCred(
          "GET",
          `/profiles/${username}`
        );

        if (error) {
          return dispatch(actions.getProfileFail(error));
        }

        dispatch(actions.getProfileSuccess(response.profile));
      };
    }
  }
};

export { getProfile };
