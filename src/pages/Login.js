import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/LoginForm';

import RENDER from '../actions/RENDER';

import CHANGE_LOGIN_USERNAME from '../reducers/login/CHANGE_LOGIN_USERNAME';
import CHANGE_LOGIN_PASSWORD from '../reducers/login/CHANGE_LOGIN_PASSWORD';
import LOGIN from '../reducers/login/LOGIN';

export default function page (path, app) {
  // register the page with the route path
  let loginView = null;
  app.route(path, {
    render: () => { // tell the app how to render login view
      loginView = ReactDOM.render(
        <LoginForm sensor={app.getViewSensor()}/>,
        document.getElementById('app')
      );
    },
    updateState: (state) => { // tell the app how to update login view
      if (state.user) {
        app.getViewSensor().send(RENDER('/datasheet'));
      }
      loginView.setState({
        username: state.login.username,
        password: state.login.password
      });
    }
  });


  // add reducer here
  /* reducer to handle actions */
  app.store.reduce('CHANGE_LOGIN_USERNAME', CHANGE_LOGIN_USERNAME);
  app.store.reduce('CHANGE_LOGIN_PASSWORD', CHANGE_LOGIN_PASSWORD);
  app.store.reduceAsync('LOGIN', LOGIN);
}
