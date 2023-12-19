import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import matchReducer from "./match";
import tournamentReducer from "./tournament";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  tournament: tournamentReducer,
  match: matchReducer,
});

export default rootReducer;