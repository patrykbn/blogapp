import { createStore } from 'redux';
import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './postsRedux';
import initialstate from './initialstate';

const rootReducer = combineReducers({
    posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialstate,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;