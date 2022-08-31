import * as services from "../service";
import * as actions from "../actions";

const putUser = (credentials, token) => {
  return async (dispatch) => {
    const { response } = await services.fetchwithAuthwithCred(
      "PUT",
      `/user`,
      credentials,
      token
    );
    dispatch(actions.putUserSuccess(response));
  };
};

export { putUser };
