import * as types from '../actions/types';

export default function ticketReducer(state = {}, action) {
  switch (action.type) {
    case types.TICKET_RAISED_SUCCESS:
      return action.data;
    case types.TICKET_RAISED_ERROR:
      return action.data;
    default:
      return state;
  }
}
