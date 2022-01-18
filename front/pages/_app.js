import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'

const App = ({Component}) => {
    return (
        <>
            <div>공통 메뉴</div>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;