import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/CLOUD9Logo.png";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoUser = () => {
    setCredential("Demo-lition");
    setPassword("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push("/");
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-inputs">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            id="username"
            name="username"
            value={credential}
            placeholder="Enter Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>{" "}
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" className="sign-in" value="Log In" /> <br />
        <div className="demo-container">
          <button className="demo" onClick={demoUser}>
            Demo User
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
