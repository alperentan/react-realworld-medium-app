import { createSelector } from "reselect";
import { fromNewArticleReducer } from "../reducers";

export const getNewArticleState = createSelector(
  fromNewArticleReducer.getNewArticleState,
  (state) => state
);

export const getNewArticleRes = createSelector(
  getNewArticleState,
  fromNewArticleReducer.getNewArticleRes
);
