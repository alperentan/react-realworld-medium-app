import * as services from "../service";
import * as actions from "../actions";

const getUser = (token) => {
  return async (dispatch) => {
    const { response } = await services.fetchwithAuthnoCred(
      "GET",
      `/user`,
      token
    );
    dispatch(actions.getUserSuccess(response));
  };
};

export { getUser };
