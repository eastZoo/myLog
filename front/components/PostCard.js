import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Avatar, Popover, List, Comment} from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";

const PostCard = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked ((prev) => !prev);  //이전 데이터를 기반으로 하트 on/off 자주씀!!!!!
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const id = useSelector((state) => state.user.me?.id); // me?.id = optional change 연산자
    return (
        <div style={{maginBottom: 20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                            <Button.Group>
                                {id && post.User.id === id              //로그인 했고 내아이디가 게시글 작성자와 같다면
                                    ? (                                 // 수정 , 삭제 가능
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger">삭제</Button>
                                        </>
                                    ) // 다르면 신고 가능
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}>
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>)}

        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.any),
        Images: PropTypes.arrayOf(PropTypes.any),
    }),
};

export default PostCard;