import { Avatar, Card, Button } from 'antd';
import React, { useCallback }from 'react';
import {useDispatch, useSelector} from "react-redux";

import { LOG_OUT_REQUEST } from '../reducers/user';


// eslint-disable-next-line react/prop-types
const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user); //me 데이터 사용가능! 더미데이터?

    const onLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{me.Posts.length}</div>,
                <div key="following">팔로잉<br />{me.Followings.length}</div>,
                <div key="follower">팔로워<br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;