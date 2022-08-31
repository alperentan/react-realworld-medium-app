import { createSelector } from "reselect";
import { fromGlobalArticlesReducer } from "../reducers";

export const getGlobalArticlesState = createSelector(
  fromGlobalArticlesReducer.getGlobalArticlesState,
  (state) => state
);

export const getGlobalArticlesRes = createSelector(
  getGlobalArticlesState,
  fromGlobalArticlesReducer.getGlobalArticlesRes
);
