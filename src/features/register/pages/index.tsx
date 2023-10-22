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
        <h1>Sign up to</h1>
        <p>IELTs Tinder?</p>
        <div className="loginInput">
          <label htmlFor="email">Email</label> <br/>
          <input type="text" aria-label="email" id="email" placeholder="Enter your email"/>
        </div>
        <div className="loginInput">
          <label htmlFor="username">Username</label> <br/>
          <input type="text" aria-label="username" id="username" placeholder="Enter your username"/>
        </div>
        <div className="loginInput">
          <label htmlFor="password">Password</label> <br/>
          <input type="password" aria-label="password" id="password" placeholder="Enter your password"/>
        </div>
        <div className="loginInput">
          <label htmlFor="confirm">Confirm password</label> <br/>
          <input type="confirm" aria-label="confirm" id="confirm" placeholder="Confirm your password"/>
        </div>
        
        <button className="loginBtn">Sign up</button>    
        <div className="bottomLogin">
          <p>Already have an account?</p>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
      <img src={bg} alt="background" />
    </div>
  </>;
};

export default Register;
