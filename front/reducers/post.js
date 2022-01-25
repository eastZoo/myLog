export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '동주'
        },
        content: '첫 번째 게시글 #wakLog #기분조아',
        Images: [{
            src: 'http://res.heraldm.com/phpwas/restmb_allidxmake.php?idx=5&simg=201810151616036915687_20181015161843_01.jpg'
        }, {
            src: 'https://static.news.zumst.com/images/111/2018/10/16/b54d109aeb0341f4b92453f452f0ad0a.jpg'
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA0MDlfMjMz%2FMDAxNTg2NDIwMTkyNjk3.Z7hx5bPJIicGYm0AEQZhChknIEQ0R80Lr2pBkbYehDkg.2HpwzHpiG6jKxxX4fqpUdbgL9HfPGR0x48JLzvSlvlgg.GIF%2FexternalFile.gif&type=sc960_832_gif'
        }],
        Comments: [{
            User: {
                nickname: "eastzoo",
            },
            content: '우왕 굳~',
        },{
            User: {
                nickname: 'wkadoo',
            },
            content: "기분조아~",
        }]
    }],
    imagePaths: [],
    postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: '녹차맛개구리',
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts], //더미 포스트를 앞에 추가 하지 않으면 게시글 써도 밑으로 내려감
                postAdded: true,
            };
        default:
            return state;
    }
};

export default reducer;