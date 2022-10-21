import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import logo from "../assets/images/CLOUD9Logo.png"
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

//   const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const demoUser = () => {
    setCredential('Demo-lition');
    setPassword('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push("/")
    return dispatch(sessionActions.login({ credential, password }))
    // handle and display errors from the login thunk action if there are any.
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
  <form className="login-form" onSubmit={handleSubmit}>
    <div className="form-inputs">

      <div className="logo-container">
        <img className="logo" src={logo} alt="logo"/>
      </div>

      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          id="username"
          name="username"
          value={credential}
          placeholder="Enter Username or Email"
          //   controlled input for the user login credential (username or email) 
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label> <br />
      {/* <hr></hr> */}
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          //   controlled input for the user password.
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label><br />
      
    
      <input type="submit" className="sign-in" value="Log In" /> <br />
    
      

    <div className="demo-container">
      <button className="demo" onClick={demoUser}>Demo User</button>
    </div>
      </div>
  </form>
  );
}

export default LoginForm;