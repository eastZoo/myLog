import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI() {
    return  axios.post('/api/login', data);
}

function* logIn(action) {
    try{
        console.log('saga logIn');
        yield delay(1000);
        // const result = yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data,  //login request에서 들어온 데이터를 바로 SUCCESS로 보내줌
        });
    } catch (err){
        console.error(err);
        yield put({
            type: 'LOG_IN_FAILURE',
            error: err.response.data,
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
        });
    } catch ( err ){
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        });
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST',logOut);
}

export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
    ]);
  }
  