import { createSelector } from "reselect";
import { fromLoginReducer } from "../reducers";

export const getLoginState = createSelector(
  fromLoginReducer.getLoginState,
  (state) => state
);

export const getLoginRes = createSelector(
  getLoginState,
  fromLoginReducer.getLoginRes
);
