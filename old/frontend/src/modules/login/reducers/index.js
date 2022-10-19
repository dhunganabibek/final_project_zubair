import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import dialogReducer from './dialogReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  loginDialogData: dialogReducer,
});

export default rootReducer;
