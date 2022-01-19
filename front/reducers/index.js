const initialState = {
    name: 'eastzoo',
    age: 27,
    password: 'babo',
}; // 기본 스테이트

// const changeNickname = {
//     type: 'CHANGE_NICKNAME',
//     data: 'zerocho'
// }
// 기본스테이트를 바꾸기위한 action, 하지만 바꿀때마다 넣어줘야된다
    // 그래서 나온 action creator


// action creator
const changeNickname = (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
};
changeNickname('dongdong');
// {
//     type: 'CHANGE_NICKNAME',
//     data: 'dongdong'
// }
store.dispatch(changeNickname("dongdong"))

// ( 이전상태, 액션 ) => 다음상태 reducer의 역할
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_NICKNAME':
            return {
                ...state,
                name: action.data,
            }
            break;
    }
};

export default rootReducer;