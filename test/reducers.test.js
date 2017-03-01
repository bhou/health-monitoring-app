import moment from 'moment';

import ACTION_ON_LOGOUT from '../src/actions/ON_LOGOUT';
import ACTION_ON_TEMPERATURE_CHANGED from '../src/actions/ON_TEMPERATURE_CHANGED';
import ACTION_ON_EDIT_TABLE_ROW from '../src/actions/ON_EDIT_TABLE_ROW';
import ACTION_ON_ACCEPT_EDIT_TABLE_ROW from '../src/actions/ON_ACCEPT_EDIT_TABLE_ROW';
import ACTION_ON_DELETE_TABLE_ROW from '../src/actions/ON_DELETE_TABLE_ROW';
import ACTION_ON_CANCEL_EDIT_TABLE_ROW from '../src/actions/ON_CANCEL_EDIT_TABLE_ROW';
import ACTION_ON_SWITCH_PATIENT from '../src/actions/ON_SWITCH_PATIENT';


import REDUCE_CHANGE_LOGIN_USERNAME from '../src/reducers/login/CHANGE_LOGIN_USERNAME';
import REDUCE_CHANGE_LOGIN_PASSWORD from '../src/reducers/login/CHANGE_LOGIN_PASSWORD';
import REDUCE_LOGIN from '../src/reducers/login/LOGIN';
import REDUCE_ON_LOGOUT from '../src/reducers/login/ON_LOGOUT';
import REDUCE_ON_TEMPERATURE_CHANGED from '../src/reducers/datasheet/ON_TEMPERATURE_CHANGED';
import REDUCE_ON_EDIT_TABLE_ROW from '../src/reducers/datasheet/ON_EDIT_TABLE_ROW';
import REDUCE_ON_ACCEPT_EDIT_TABLE_ROW from '../src/reducers/datasheet/ON_ACCEPT_EDIT_TABLE_ROW';
import REDUCE_ON_DELETE_TABLE_ROW from '../src/reducers/datasheet/ON_DELETE_TABLE_ROW';
import REDUCE_ON_CANCEL_EDIT_TABLE_ROW from '../src/reducers/datasheet/ON_CANCEL_EDIT_TABLE_ROW';
import REDUCE_ON_SWITCH_PATIENT from '../src/reducers/datasheet/ON_SWITCH_PATIENT';



import getPrevState from './example';


/* test starts here */

it('CHANGE_LOGIN_USERNAME action', () => {
  let prevState = getPrevState();

  expect(REDUCE_CHANGE_LOGIN_USERNAME(prevState, {
    actionType: 'CHANGE_LOGIN_USERNAME',
    username: 'new username'
  }).login.username).toBe('new username');
});

it('CHANGE_LOGIN_PASSWORD action', () => {
  let prevState = getPrevState();

  expect(REDUCE_CHANGE_LOGIN_PASSWORD(prevState, {
    actionType: 'CHANGE_LOGIN_PASSWORD',
    password: 'new password'
  }).login.password).toBe('new password');
});

it('LOGIN action', (done) => {
  let prevState = getPrevState();
  prevState.login.username = 'test user';
  prevState.login.password = 'test password';

  REDUCE_LOGIN(prevState, {
    actionType: 'LOGIN',
  }, (err, state) => {
    expect(state.user.username).toBe('test user');
    done();
  })
});

it('ON_LOGOUT action', () => {
  let prevState = getPrevState();
  prevState.user = {
    username: 'test user'
  };

  let state = REDUCE_ON_LOGOUT(prevState, ACTION_ON_LOGOUT());
  expect(state.user).toBe(null);
});

it ('ON_EDIT_TABLE_ROW', () => {
  let prevState = getPrevState();

  expect(prevState.patients[0].data[0].editBuffer).toBeUndefined();

  let state = REDUCE_ON_EDIT_TABLE_ROW(prevState, ACTION_ON_EDIT_TABLE_ROW(0));

  expect(prevState.patients[0].data[0].editBuffer).not.toBeUndefined();
});

it('edit value in table editor', (done) => {
  let prevState = getPrevState();

  prevState = REDUCE_ON_EDIT_TABLE_ROW(prevState, ACTION_ON_EDIT_TABLE_ROW(0));


  let oldTemperature = prevState.patients[0].data[0].body_temperature.value;
  let newTemperature = oldTemperature + 1;

  prevState = REDUCE_ON_TEMPERATURE_CHANGED(prevState, ACTION_ON_TEMPERATURE_CHANGED(0, newTemperature, 'C'));
  
  REDUCE_ON_ACCEPT_EDIT_TABLE_ROW(prevState, ACTION_ON_ACCEPT_EDIT_TABLE_ROW(0), (err, state) => {
    expect(state.patients[0].data[0].body_temperature.value).toBe(newTemperature);
    done();
  });
});

it('ON_DELETE_TABLE_ROW', (done) => {
  let prevState = getPrevState();
  let count = prevState.patients[0].data.length;

  REDUCE_ON_DELETE_TABLE_ROW(prevState, ACTION_ON_DELETE_TABLE_ROW(0), (err, state) => {
    expect(state.patients[0].data.length).toBe(count - 1);
    done();
  });
});

it('ON_CANCEL_EDIT_TABLE_ROW', () => {
  let prevState = getPrevState();

  expect(prevState.patients[0].data[0].editing).toBeUndefined();

  prevState = REDUCE_ON_EDIT_TABLE_ROW(prevState, ACTION_ON_EDIT_TABLE_ROW(0));
  
  expect(prevState.patients[0].data[0].editing).toBeTruthy();

  let state = REDUCE_ON_CANCEL_EDIT_TABLE_ROW(prevState, ACTION_ON_CANCEL_EDIT_TABLE_ROW(0));

  expect(state.patients[0].data[0].editing).toBeFalsy();
});

it('ON_SWITCH_PATIENT', (done) => {
  let prevState = getPrevState();
  
  expect(prevState.patients[1].data.length).toBe(0);

  REDUCE_ON_SWITCH_PATIENT(prevState, ACTION_ON_SWITCH_PATIENT('1235674890'), (err, state) => {
    expect(state.patients[1].data.length).not.toBe(0);
    done();
  }); 
});
