export const initialState = {
    isLoggingIn: false,  // 로그인 시도중 true면 로딩창을 띄우는 용도
    isLoggedIn: false,
    isLoggingOut: false, // 로그아웃 시도중 true면 로딩창을 띄우는 용도
    me: null,
    signUpData: {},
    loginData: {},
};

// export const  loginAction = (data) => {
//     return (dispatch, getState) => {
//         const state = getState();
//         dispatch(loginRequestAction());
//         axios.post('/api/login')
//             .then((res) => {
//                 dispatch(loginSuccessAction(res.data));
//             })
//             .catch((err) => {
//                 dispatch(loginFailureAction(err));
//             })
//     }
// }

export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
    }
}

export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
        data,
    }
}

export const logoutSuccessAction = (data) => {
    return {
        type: 'LOG_OUT_SUCCESS',
    }
}

export const logoutFailureAction = (data) => {
    return {
        type: 'LOG_OUT_FAILURE',
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
                me: action.data,
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