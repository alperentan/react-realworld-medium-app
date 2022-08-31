import * as services from "../service";
import * as actions from "../actions";

const postUsers = (credentials) => {
  return async (dispatch) => {
    const { response } = await services.fetchnoAuthwithCred(
      "POST",
      `/users`,
      credentials
    );
    dispatch(actions.postUsersSuccess(response));
  };
};

export { postUsers };
