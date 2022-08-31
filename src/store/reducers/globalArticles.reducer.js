import * as actions from "../actions";

const initialState = {
  res: {},
};

function getGlobalArticlesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ARTICLES:
      return {
        ...state,
      };
    case actions.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.GET_ARTICLES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getGlobalArticlesState = (state) => state.globalArticles;
export const getGlobalArticlesRes = (globalArticlesState) =>
  globalArticlesState.res;

export default getGlobalArticlesReducer;
