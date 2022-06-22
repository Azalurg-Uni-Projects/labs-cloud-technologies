import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { userReducer } from './users/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  users: userReducer,
});

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger))
);

export default store;
