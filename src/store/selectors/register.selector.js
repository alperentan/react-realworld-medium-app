import { createSelector } from "reselect";
import { fromRegisterReducer } from "../reducers";

export const getRegisterState = createSelector(
  fromRegisterReducer.getRegisterState,
  (state) => state
);

export const getRegisterRes = createSelector(
  getRegisterState,
  fromRegisterReducer.getRegisterRes
);
