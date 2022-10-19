import * as types from '../actions/types';

const defaultState = {
  isEmployee: false,
  isDialogOpen: false,
  isRaiseTicket: false,
  isOrder: false,
};
export default function dialogReducer(state = defaultState, action) {
  switch (action.type) {
    case types.LOGIN_DIALOG_OPEN:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
