import * as actions from "../actions";

const initialState = {
  res: {},
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actions.POST_USER_LOGIN:
      return {
        ...state,
      };
    case actions.POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.POST_USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getLoginState = (state) => state.login;
export const getLoginRes = (loginState) => loginState.res;

export default loginReducer;
