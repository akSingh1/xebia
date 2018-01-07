import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom'
import Service from './services';

const LogoutBtn = withRouter(({ history }) => (
    <button
        type='button'
        onClick={() => {
            window.localStorage.removeItem('isAuthenticated');
            window.localStorage.removeItem('user');
            history.push('/') }}
    >
        Sign out
    </button>
));

class Search extends Component {

    constructor (props) {
        super(props);

    }

    componentWillMount () {

    }

    componentDidMount () {

    }

    render() {
        return (
            <div>
                <LogoutBtn/>
                Hello Search!!

            </div>

        );
    }

}

export default Search;
