import { all, fork  } from 'redux-saga/effects'
//외에도 delay, debounce, throttle, takeLatest, takeMaybe등이 있다
//generator, effects 원리를 정확히 알아야 잘 사용가능 !!
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

//기존 패턴 복사해서 사용가능


export default function* rootSaga() {
    yield all ([            // all은 동시에 실행할 수 있게 도와줌
        fork(postSaga),   //call, fork는 다르다,
        fork(userSaga),  //fork,call로 genetor함수를 실행해준다
    ]);
}