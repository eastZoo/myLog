// 비동기는 항상 REQUEST, SUCCESS, FAILURE 기억!!!


export const initialState = {
    isLoggingIn: false,  // 로그인 시도중 true면 로딩창을 띄우는 용도
    isLoggedIn: false,
    isLoggingOut: false, // 로그아웃 시도중 true면 로딩창을 띄우는 용도
    me: null,
    signUpData: {},
    loginData: {},
};

export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

//saga가 알아서 SUCCESS, FAILURE 만들어주기때문에 reducers에서 만들필요가 없기에 삭제

export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
        data,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST':
            return {
                ...state,
                isLoggingIn: true,
            };
        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: "eastzoo"},
            };
        case 'LOG_IN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            };
        case 'LOG_OUT_REQUEST':
            return {
                ...state,
                isLoggingOut: true, //request일때는 ing true
            };
        case 'LOG_OUT_SUCCESS':
            return {
                ...state,
                isLoggingOut: false, //로그인 성공 시 ing false
                isLoggedIn: false,
                me: null,
            };
        case 'LOG_OUT_FAILURE':
            return {
                ...state,
                isLoggingOut: false, //실패해도 ing는 false
            };

        default:
            return state;
    }
};

export default reducer;