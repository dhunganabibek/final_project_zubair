import * as types from '../actions/types';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.data;
    case types.LOGIN_ERROR:
      return action.data;
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
