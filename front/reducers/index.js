import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const initialState = {
  user: {
  },
  post: {

  },
}; // 기본 스테이트

// ( 이전상태, 액션 ) => 다음상태 reducer의 역할
// combineReducers가 알아서 user initial, post initial 가져와줌 !!!
const rootReducer = combineReducers({
  index: (state = {}, action) => { // SSR을 위한 HTDRATE 삽입
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
