import { createSelector } from "reselect";
import { fromCurrentUserReducer } from "../reducers";

export const getCurrentUserState = createSelector(
  fromCurrentUserReducer.getCurrentUserState,
  (state) => state
);

export const getCurrentUserRes = createSelector(
  getCurrentUserState,
  fromCurrentUserReducer.getCurrentUserRes
);
