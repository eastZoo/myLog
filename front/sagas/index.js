import { all, fork } from 'redux-saga/effects';
// 외에도 delay, debounce, throttle, takeLatest, takeMaybe등이 있다
// generator, effects 원리를 정확히 알아야 잘 사용가능 !!
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
// 기존 패턴 복사해서 사용가능
axios.defaults.withCredentials = true; // sagas에서 보내는 axios요청들에는 전부 공통적으로 적용된다!

export default function* rootSaga() {
  yield all([ // all은 동시에 실행할 수 있게 도와줌
    fork(postSaga), // call, fork는 다르다,
    fork(userSaga), // fork,call로 genetor함수를 실행해준다
  ]);
}
