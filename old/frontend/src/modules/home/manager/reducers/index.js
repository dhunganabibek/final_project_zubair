import * as types from '../actions/types';

export default function ticketDetailsReducer(state = [], action) {
  switch (action.type) {
    case types.GET_TICKETS_DATA:
      return action.data;
    case types.TICKET_DATA_ERRORS:
      return { error: true };
    default:
      return state;
  }
}
