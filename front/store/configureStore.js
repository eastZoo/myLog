import { createWrapper } from 'next-redux-wrapper';
import {createStore} from "redux";

import reducer from '../reducers';

const configureStore = () => {
    const store = createStore(reducer);
    store.dispatch({
        type: 'CHANGE_NICKNAME',
        data: 'zerocho',
    })
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'develpment'}
);

export default wrapper;