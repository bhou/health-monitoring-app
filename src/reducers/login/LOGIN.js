export default function LOGIN(prevState, action, done) {
  let username = prevState.login.username;
  let password = prevState.login.password;

  if (username === null || username === '') {
    username = 'anonymous'
  }
  // call your backend api here to check the credential
  setTimeout(() => {
    prevState.user = {
      id: new Date().getTime(),
      username: username,
      token: 'new token',
      // other user information you get from your backend
    };
    // pass the new state to call back function
    done(null, prevState);
  }, 1000);
};
