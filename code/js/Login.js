import React, { Component, PropTypes } from 'react';
import Service from './services';

class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount () {

    }

    componentDidMount () {
        console.log('props',this.props);
    }

    setError = (error = 'Please enter valid username and password.') => {
        this.setState({
            error
        });
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = () => {
        const { username, password } = this.state;
        if(!username || !password) {
            this.setError();
            return;
        }
        Service.fetchPeople(username).then( (resp) => {
            if(resp.count === 1 && resp.results[0].birth_year === password) {
                window.localStorage.setItem('isAuthenticated', true);
                window.localStorage.setItem('user', username);
                this.setError('');
                this.props.history.push('/search');

            } else {
                this.setError();
            }
        }).catch((err) => {
            this.setError(err.message);
        });

    };

    render() {
        const { username, password, error} = this.state;
        return (
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" value={username} onChange={this.onUsernameChange}/>
                <label htmlFor="username">Password</label>
                <input type="password" id="password" placeholder="Password" value={password} onChange={this.onPasswordChange}/>
                <input type="buton" value="Login" onClick={this.handleLogin}/>
                <div>{error}</div>
            </div>

        );
    }

}

export default Login;
