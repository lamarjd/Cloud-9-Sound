

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logo from "../assets/images/CLOUD9Logo.png"
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser && (Object.keys(sessionUser).length !== 0)) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
            <h2>Welcome to Cloud-9!!</h2> 
            <h4>Signup Below to join the community</h4> <br/>
      <div className="form-inputs">
        <div className="logo-container">
        <img className="logo" src={logo} alt="logo"/>
        </div>

      <label>
        Email
        <input
          type="text"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          placeholder="Pick a Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="Choose Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
      <label>
        First Name
        <input
          type="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setfirstName(e.target.value)}
          required
          />
      </label>
      <label>
        Last Name
        <input
          type="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setlastName(e.target.value)}
          required
          />
      </label>
      <button type="submit">Sign Up</button>
          </div>
    </form>
  );
}

export default SignupFormPage;