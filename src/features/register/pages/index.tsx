import React from "react";
import bg from "../../../assets/images/loginBG.png";
import "./Register.style.css";
import { NavLink } from "react-router-dom";

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = () => {
  return <>
    <div className="login-page">
      <div className="loginWrapper">
        <h3>Welcome!</h3>
        <h1>Sign in to</h1>
        <p>IELTs Tinder?</p>
        <div className="loginInput">
          <label htmlFor="username">Username</label> <br/>
          <input type="text" aria-label="username" id="username" placeholder="Enter your username"/>
        </div>
        <div className="loginInput">
          <label htmlFor="password">Password</label> <br/>
          <input type="password" aria-label="password" id="password" placeholder="Enter your password"/>
        </div>
        <div className="othersWrapper">
          <div>
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <NavLink to="#">Forgot password?</NavLink>
        </div>
        <button className="loginBtn">Login</button>    
        <div className="bottomLogin">
          <p>Don't have an Account?</p>
          <NavLink to="/signup">Register</NavLink>
        </div>
      </div>
      <img src={bg} alt="background" />
    </div>
  </>;
};

export default Register;
