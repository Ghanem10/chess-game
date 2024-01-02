import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import matchReducer from "./match";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  match: matchReducer,
});

export default rootReducer;