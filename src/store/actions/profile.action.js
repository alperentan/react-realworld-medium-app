export const GET_PROFILE = "[Profile] Get Profile";
export const GET_PROFILE_SUCCESS = "[Profile] Get Profile Success";
export const GET_PROFILE_FAIL = "[Profile] Get Profile Fail";

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (payload) => ({
  type: GET_PROFILE_SUCCESS,
  payload,
});

export const getProfileFail = (payload) => ({
  type: GET_PROFILE_FAIL,
  payload,
});
