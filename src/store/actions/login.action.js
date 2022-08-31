export const POST_USER_LOGIN = "[User] Post User";
export const POST_USER_LOGIN_SUCCESS = "[User] Post User Success";
export const POST_USER_LOGIN_FAIL = "[User] Post User Fail";

export const postUserLogin = () => ({
  type: POST_USER_LOGIN,
});

export const postUserLoginSuccess = (payload) => ({
  type: POST_USER_LOGIN_SUCCESS,
  payload,
});

export const postUserLoginFail = (payload) => ({
  type: POST_USER_LOGIN_FAIL,
  payload,
});
