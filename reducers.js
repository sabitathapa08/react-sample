import { combineReducers } from 'redux';
import globalReducer from './src/reducers';
import { connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history),
  global: globalReducer,
});
