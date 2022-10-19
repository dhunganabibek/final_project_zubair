import { combineReducers } from 'redux';

import loginReducer from '../modules/login/reducers';
import ticketReducer from '../modules/ticket/reducers';
import ticketDetailsReducer from '../modules/home/manager/reducers';

const rootReducer = combineReducers({
  login: loginReducer,
  ticket: ticketReducer,
  managerTicket: ticketDetailsReducer,
});

export default rootReducer;
