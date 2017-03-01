import React from 'react';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  handleUsernameChange(event) {
    this.props.sensor.send({
      actionType: 'CHANGE_LOGIN_USERNAME',
      username: event.target.value
    })
  }
  handlePasswordChange(event) {
    this.props.sensor.send({
      actionType: 'CHANGE_LOGIN_PASSWORD',
      password: event.target.value
    })
  }
  handleLogin(event) {
    this.props.sensor.send({
      actionType: 'LOGIN'
    });
  }
  render() {
    return (
      <div className="login-view">
        <div className="view-header">
          <h4 className="logo">Health Monitoring Console</h4>
        </div>
        <div className="login-view-content">
          <img src="/images/doctor.png"/>
          <div className="login-form">
            <h4>Please sign in</h4>
            <div className="login-form-field">
              <span>Username:</span>&nbsp;<input type="text" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
            </div>
            <div className="login-form-field">
              <span>Password:</span>&nbsp;<input type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
            </div>
            <button className="press" onClick={this.handleLogin.bind(this)}>Login</button>
          </div>
        </div>
        <div className="view-footer">
          <h4 className="logo"><span>2017</span> made by <a href="https://medium.com/@bohou">Bo HOU</a> with&nbsp;
            <a href="http://collarjs.com">collar.js</a> & <a href="https://www.npmjs.com/package/collux">collux</a></h4>
        </div>
      </div>
    )
  }
}

export default LoginForm;