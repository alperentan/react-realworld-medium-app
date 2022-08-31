export const POST_USERS = "[User] Post Users";
export const POST_USERS_SUCCESS = "[User] Post Users Success";
export const POST_USERS_FAIL = "[User] Post Users Fail";

export const postUsers = () => ({
  type: POST_USERS,
});

export const postUsersSuccess = (payload) => ({
  type: POST_USERS_SUCCESS,
  payload,
});

export const postUsersFail = (payload) => ({
  type: POST_USERS_FAIL,
  payload,
});
