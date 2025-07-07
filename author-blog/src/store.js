import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
  userReducer,
  usersReducer,
  postReducer,
  postsReducer,
  appReducer,
} from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const reducer = combineReducers({
  appState: appReducer,
  userState: userReducer,
  usersState: usersReducer,
  postState: postReducer,
  postsState: postsReducer,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
