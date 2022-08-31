import { createSelector } from "reselect";
import { fromProfileReducer } from "../reducers";

export const getProfileState = createSelector(
  fromProfileReducer.getProfileState,
  (state) => state
);

export const getProfileRes = createSelector(
  getProfileState,
  fromProfileReducer.getProfileRes
);
