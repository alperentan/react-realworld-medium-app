import * as actions from "../actions";

const initialState = {
  res: {},
};

function newArticleReducer(state = initialState, action) {
  switch (action.type) {
    case actions.POST_ARTICLES:
      return {
        ...state,
      };
    case actions.POST_ARTICLES_SUCCESS:
      return {
        ...state,
        res: action.payload,
      };
    case actions.POST_ARTICLES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getNewArticleState = (state) => state.newArticle;
export const getNewArticleRes = (newArticleState) => newArticleState.res;

export default newArticleReducer;
