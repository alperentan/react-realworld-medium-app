import * as actions from "../actions";

const initialState = {
  res: {},
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.POST_USERS:
      return {
        ...state,
      };
    case actions.POST_USERS_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.POST_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getRegisterState = (state) => state.register;
export const getRegisterRes = (registerState) => registerState.res;

export default registerReducer;
