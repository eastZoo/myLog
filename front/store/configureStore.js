import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers';

const loggerMiddleware = ({ dispatch, getState }) => (next) =>(action) => {
    console.log(action);
    return next(action);
};

const configureStore = () => {
    const middlewares = [thunkMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'  //개발 or 배포모드 구분
        ? compose(applyMiddleware(...middlewares))  // 배포용일때
        : composeWithDevTools(applyMiddleware(...middlewares)) //개발용일때
    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'develpment'}
);

export default wrapper;