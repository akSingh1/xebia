import React, { Component, PropTypes } from 'react';
import {withRouter} from "react-router-dom";

const LogoutBtn = withRouter(({ history }) => (
    <button
        type='button'
        className="logoutBtn"
        onClick={() => {
            window.localStorage.removeItem('isAuthenticated');
            window.localStorage.removeItem('user');
            history.push('/') }}
    >
        Sign out
    </button>
));

const Page = ({children, isLogin=false}) => (
    <div className="app">
        <div className="header alignCenter">
            <h2>Star Wars</h2>
            {
                !isLogin && window.localStorage.getItem('isAuthenticated') === 'true' ?
                    <LogoutBtn/>: null
            }
        </div>
        <div className="content">
            {
                children
            }
        </div>
    </div>
);

export default Page;