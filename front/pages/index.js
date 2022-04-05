import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  //react-virtualized 사용해보기!! 무한스크롤
  useEffect(
    () => {
      if (inView && hasMorePosts && !loadPostsLoading
          && document.documentElement.clientHeight < document.documentElement.scrollHeight) {
        const lastId = mainPosts[mainPosts.length - 10]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    },
    [inView, hasMorePosts, loadPostsLoading, mainPosts],
  );

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
      <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
    </AppLayout>
  );
};

export default Home;
