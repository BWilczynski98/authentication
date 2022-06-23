import React, { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const { token } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    console.log(enteredNewPassword);
    console.log(token);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSzQN7FM6b0e3HM03kdLwNrHQiSl7xRtc',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json',
        }

      })

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

