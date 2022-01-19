import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    user:{
        isLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post:{
        mainPosts: [],
    },
}; // 기본 스테이트

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}




// const changeNickname = {
//     type: 'CHANGE_NICKNAME',
//     data: 'zerocho'
// }
// 기본스테이트를 바꾸기위한 action, 하지만 바꿀때마다 넣어줘야된다
//     그래서 나온 action creator


// action creator
const changeNickname = (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
};

// async


// ( 이전상태, 액션 ) => 다음상태 reducer의 역할
const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log("HYDRATE", action);
            return { ...state, ...action.payload}
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    user: action.data,
                },
            };
        case 'LOG_OUT':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user: null,
                },
            };
        default:
            return state;
    }
};

export default reducer;