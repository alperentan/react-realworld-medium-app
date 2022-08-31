import { combineReducers } from "redux";
import profileReducer, * as fromProfileReducer from "./profile.reducer";
import loginReducer, * as fromLoginReducer from "./login.reducer";
import registerReducer, * as fromRegisterReducer from "./register.reducer";
import updateUserReducer, * as fromUpdateUserReducer from "./updateUser.reducer";
import currentUserReducer, * as fromCurrentUserReducer from "./currentUser.reducer";
import newArticleReducer, * as fromNewArticleReducer from "./newArticle.reducer";
import globalArticlesReducer, * as fromGlobalArticlesReducer from "./globalArticles.reducer";

const reducers = combineReducers({
  profile: profileReducer,
  login: loginReducer,
  register: registerReducer,
  updateUser: updateUserReducer,
  currentUser: currentUserReducer,
  newArticle: newArticleReducer,
  globalArticles: globalArticlesReducer,
});

export {
  reducers,
  fromProfileReducer,
  fromLoginReducer,
  fromRegisterReducer,
  fromUpdateUserReducer,
  fromCurrentUserReducer,
  fromNewArticleReducer,
  fromGlobalArticlesReducer,
};
