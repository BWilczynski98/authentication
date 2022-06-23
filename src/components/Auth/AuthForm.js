import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const { login } = useContext(AuthContext)
  console.log(login);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassowrd = passwordInputRef.current.value;
    setIsLoading(true);
    let url = null;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSzQN7FM6b0e3HM03kdLwNrHQiSl7xRtc';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSzQN7FM6b0e3HM03kdLwNrHQiSl7xRtc';
    };

    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassowrd,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log(data);
        login(data.idToken);
      })
      .catch(err => {
        alert(err.message)
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
