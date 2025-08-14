import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    if (username === 'admin' && password === 'admin123') {
      this.setState({ loggedIn: true });
    } else {
      alert('Invalid admin credentials');
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-page">
        <h2>🔐 Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default AdminLogin;
