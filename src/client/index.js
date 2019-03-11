import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faListUl, faTh, faHeart, faPen, faBars, faTimes, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './scss/main.scss';
import App from './components/App';
import rootReducer from './reducers';

library.add(far, fab, faListUl, faTh, faHeart, faPen, faBars, faTimes, faUser, faSignOutAlt);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
