import { all, call, delay, fork, put, delay, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
//외에도 delay, debounce, throttle, takeLatest, takeMaybe등이 있다
//generator, effects 원리를 정확히 알아야 잘 사용가능 !!
import axios from 'axios';

//기존 패턴 복사해서 사용가능

function logInAPI() {
    return  axios.post('/api/login');
}

function* logIn(action) {
    try{
        yield delay(2000);
        // const result = yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        });
    } catch ( err ){
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        });
    }
}

function logOutAPI() {
    return  axios.post('/api/logOut');
}

function* logOut() {
    try{
        yield delay(1000);
        // const result = yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        });
    } catch ( err ){
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        });
    }
}

function addPostAPI(data) {
    return  axios.post('/api/post', data);
}

function* addPost(action) {
    try{
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
        });
    } catch ( err ){
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data
        });
    }
}

function* watchLogIn() {
    yield throttle('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST',logOut);
}

function* watchAddPost() {
    yield throttle('ADD_POST_REQUEST',addPost, 2000);
}

export default function* rootSaga() {
    yield all ([            // all은 동시에 실행할 수 있게 도와줌
        fork(watchLogIn),   //call, fork는 다르다,
        fork(watchLogOut),  //fork,call로 genetor함수를 실행해준다
        fork(watchAddPost),
    ]);
}