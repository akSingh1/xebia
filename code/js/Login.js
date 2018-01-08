import React, { Component, PropTypes } from 'react';
import Service from './services';
import Page from './Page';

class Login extends Component {

    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isProcessing: false
        }
    }

    setError = (error = 'Please enter valid username and password.') => {
        this.setState({
            error,
            isProcessing: false
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
        this.setState({
            isProcessing: true
        });
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
        const { username, password, error, isProcessing} = this.state;
        return (
            <Page isLogin={true}>
                <div className="loginContainer">
                    <div className="loginCenter">
                        <div className="loginBox">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" placeholder="Username" value={username} onChange={this.onUsernameChange}/>
                        </div>
                        <div className="loginBox">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" placeholder="Password" value={password} onChange={this.onPasswordChange}/>
                        </div>
                        <div className="loginBox alignCenter">
                            <input className="loginBtn" type="button" disabled={isProcessing} value={isProcessing ? "Logging in...": "Login"} onClick={this.handleLogin}/>
                        </div>

                        <div className="loginBox error">{error}</div>
                    </div>

                </div>
            </Page>


        );
    }

}

export default Login;
