import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
    const followerList = [{ nickname: '신동주' }, { nickname: '녹차맛개구리' }, { nickname: '동동' }];
    const followingList = [{ nickname: '최진녕' }, { nickname: '지니' }, { nickname: '채채' }];

    return (
        <>
            <Head>
                <title>프로필 | WakLog</title>
            </Head>
            <AppLayout>
                <Head>
                    <title>내 프로필 | NodeBird</title>
                </Head>
                <NicknameEditForm />
                <FollowList
                    header="팔로잉 목록"
                    data={followingList}
                />
                <FollowList
                    header="팔로워 목록"
                    data={followerList}
                />
            </AppLayout>

        </>
    );
};

export default Profile;