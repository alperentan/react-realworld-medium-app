import * as actions from "../actions";

const initialState = {
  res: {},
};

function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case actions.PUT_USER:
      return {
        ...state,
      };
    case actions.PUT_USER_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.PUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getUpdateUserState = (state) => state.updateUser;
export const getUpdateUserRes = (updateUserState) => updateUserState.res;

export default updateUserReducer;
