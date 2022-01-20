import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from "styled-components";
import { useSelector } from 'react-redux';

import UserProfile from '../components/UserProfile'
import LoginForm from '../components/LoginForm'


const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

// eslint-disable-next-line react/prop-types
const AppLayout = ({children}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // reducer, index로 인한 중앙관리로 컴포넌트별 데이터관리 불필요

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    // const {isLoggedIn} = useSelector((state) => state.user)
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>동주Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    {/* ezslint-disable-next-line react/jsx-no-undef */}
                    <SearchInput enterButton/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://eastzoo.co.kr" target="_blank" rel="noreferrer noopener">Made by EastZoo</a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.prototype = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
