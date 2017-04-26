import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import {reducer as toastrReducer} from 'react-redux-toastr'
import { reducer as userReducer } from '../redux/user'
import welcomeItems from "./welcome";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer,
  welcomeItems: welcomeItems,
  users: userReducer,
});
