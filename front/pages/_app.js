import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';   //next head접근 컴포넌트 따로있다!
import 'antd/dist/antd.css'

const App = ({Component}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>WakLog</title>
            </Head>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;