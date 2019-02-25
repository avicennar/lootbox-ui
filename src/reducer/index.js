import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import selectId from './selectId';

export default combineReducers({
  id_user: () => 1,
  auth: AuthReducer,
  getId : selectId
});

