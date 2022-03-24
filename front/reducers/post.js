import shortId from 'shortid';

// 대문자로 적힌 부분은 DB에서 주는 부분이기에 id가 다 맥여있다
export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '동주',
    },
    content: '첫 번째 게시글 #wakLog #기분조아',
    Images: [{
      id: shortId.generate(),
      src: 'http://res.heraldm.com/phpwas/restmb_allidxmake.php?idx=5&simg=201810151616036915687_20181015161843_01.jpg',
    }, {
      id: shortId.generate(),
      src: 'https://static.news.zumst.com/images/111/2018/10/16/b54d109aeb0341f4b92453f452f0ad0a.jpg',
    }, {
      id: shortId.generate(),
      src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA0MDlfMjMz%2FMDAxNTg2NDIwMTkyNjk3.Z7hx5bPJIicGYm0AEQZhChknIEQ0R80Lr2pBkbYehDkg.2HpwzHpiG6jKxxX4fqpUdbgL9HfPGR0x48JLzvSlvlgg.GIF%2FexternalFile.gif&type=sc960_832_gif',
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'eastzoo',
      },
      content: '우왕 굳~',
    }, {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'wkadoo',
      },
      content: '기분조아~',
    }],
  }],
  imagePaths: [],
  postAdded: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'dongzoo',
  },
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '녹차맛개구리',
  },
  Images: [],
  Comments: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
