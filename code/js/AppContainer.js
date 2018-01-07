import React, { Component, PropTypes } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import Search from './Search';
import Login from './Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        window.localStorage.getItem('isAuthenticated') === 'true' ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/'
            }}/>
        )
    )}/>
);

class AppContainer extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <PrivateRoute exact path="/search" component={Search}/>
                </div>
            </Router>
        )
    }
}

export default <AppContainer/>;
