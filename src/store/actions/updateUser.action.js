export const PUT_USER = "[User] Put User";
export const PUT_USER_SUCCESS = "[User] Put User Success";
export const PUT_USER_FAIL = "[User] Put User Fail";

export const putUser = () => ({
  type: PUT_USER,
});

export const putUserSuccess = (payload) => ({
  type: PUT_USER_SUCCESS,
  payload,
});

export const putUserFail = (payload) => ({
  type: PUT_USER_FAIL,
  payload,
});
