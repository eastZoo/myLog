import { createWrapper } from 'next-redux-wrapper';

const configureStore = () => {
    
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'develpment'});

export default wrapper;