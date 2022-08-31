import * as actions from "../actions";

const initialState = {
  res: {},
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_PROFILE:
      return {
        ...state,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getProfileState = (state) => state.profile;
export const getProfileRes = (profileState) => profileState.res;

export default profileReducer;
