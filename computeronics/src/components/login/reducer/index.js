import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data;
    case LOGIN_ERROR:
      return action.data;
    case LOGIN_LOADING:
      return action.data;
    case LOGOUT:
      localStorage.clear();
      return {};
    default:
      return state;
  }
}
