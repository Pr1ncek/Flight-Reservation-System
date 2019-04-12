import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import errorReducer from './error-reducer';
import searchReducer from './search-reducer';
import loadingReducer from './loading-reducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  results: searchReducer,
  loading: loadingReducer
});
