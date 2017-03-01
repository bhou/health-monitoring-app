export default function CHANGE_LOGIN_PASSWORD (prevState, action) {
  prevState.login.password = action.password;
  return prevState;
};