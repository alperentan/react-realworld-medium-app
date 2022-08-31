import * as actions from "../actions";

const initialState = {
  res: {},
};

function getCurrentUserReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER:
      return {
        ...state,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.GET_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getCurrentUserState = (state) => state.currentUser;
export const getCurrentUserRes = (currentUserState) => currentUserState.res;

export default getCurrentUserReducer;
