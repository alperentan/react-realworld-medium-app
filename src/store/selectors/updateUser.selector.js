import { createSelector } from "reselect";
import { fromUpdateUserReducer } from "../reducers";

export const getUpdateUserState = createSelector(
  fromUpdateUserReducer.getUpdateUserState,
  (state) => state
);

export const getUpdateUserRes = createSelector(
  getUpdateUserState,
  fromUpdateUserReducer.getUpdateUserRes
);
