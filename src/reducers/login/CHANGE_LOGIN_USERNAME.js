export default function CHANGE_LOGIN_USERNAME(prevState, action) {
  prevState.login.username = action.username;
  return prevState;
}