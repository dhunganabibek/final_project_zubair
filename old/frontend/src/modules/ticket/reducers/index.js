import * as types from '../actions/types';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case types.SUBMIT_TICKET_SUCCESS:
      return action.data;
    case types.SUBMIT_TICKET_ERROR:
      return action.data;
    default:
      return state;
  }
}
