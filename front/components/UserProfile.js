import { Avatar, Card, Button } from 'antd';
import React, { useCallback }from 'react';


const dummy = {
    nickname: '동주',
    Posts: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false,
};

// eslint-disable-next-line react/prop-types
const UserProfile = ({ setIsLoggedIn }) => {
    const onLogOut = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{dummy.Posts.length}</div>,
                <div key="following">팔로잉<br />{dummy.Followings.length}</div>,
                <div key="follower">팔로워<br />{dummy.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;