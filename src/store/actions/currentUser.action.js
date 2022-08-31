export const GET_USER = "[User] Get User";
export const GET_USER_SUCCESS = "[User] Get User Success";
export const GET_USER_FAIL = "[User] Get User Fail";

export const getUser = () => ({
  type: GET_USER,
});

export const getUserSuccess = (payload) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserFail = (payload) => ({
  type: GET_USER_FAIL,
  payload,
});
