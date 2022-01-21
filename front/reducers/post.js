export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '동주'
        },
        content: '첫 번째 게시글 #wakLog #기분조아',
        Images: [{
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA0MjVfOTIg%2FMDAxNTg3ODE5NzAyMDQy.SOWLE41oKiZ0GOH8UHW0-zLda78cJRcUyw_8F7VyCxwg.ebqJGZ3BpEdSn5ajaGBuEebzo2qKGmWh70Uh6khDFB8g.PNG%2F%25C0%25D4_%25B4%25AB_%25C0%25A7%25C4%25A1_%252B100.png&type=sc960_832'
        }, {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA1MjlfMTQy%2FMDAxNTkwNzE4OTk2MDQ2.NC_rnJjIvZzZ7I8v4WU7sBBJNZTIYL8CvxaqextsXz8g.AB7l8iSzqhCSumcVJ39rjxfn_-RJzIuGaTLq1CdZqOEg.PNG%2F%25C7%25B3%25BC%25B1%25B5%25CE.png&type=sc960_832'
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