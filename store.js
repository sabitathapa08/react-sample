import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import rootSaga from './src/sagas';

/* eslint-disable  no-underscore-dangle */

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const history = createBrowserHistory();

const isDev = process.env.PLATFORM === 'local';
const middleware = [sagaMiddleware, routerMiddleware(history)];

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    )
  : createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware)),
    );

sagaMiddleware.run(rootSaga);
store.runSaga = sagaMiddleware.run;

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
