import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>{id}번 게시글</div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({ // 단일 게시글 불러오는 액션
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default Post;
