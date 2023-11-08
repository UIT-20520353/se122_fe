import React, { useState } from "react";
import bg from "../../../assets/images/loginBG.png";
import "./Login.style.css";
import { NavLink, useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { setLocalStorage } from "../../../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../../consts/app";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    const { ok, body, error } = await authApi.login({
      email,
      password,
    });

    if (ok && body) {
      setLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, body.accessToken);
      navigate("/");
      return;
    }

    console.error(error);
  };

  return (
    <>
      <div className="login-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="loginWrapper"
        >
          <h3>Welcome!</h3>
          <h1>Sign in to</h1>
          <p>IELTs Tinder?</p>
          <div className="loginInput">
            <label htmlFor="username">Username</label> <br />
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginInput">
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="othersWrapper">
            <div>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <NavLink to="#">Forgot password?</NavLink>
          </div> */}
          <button type="submit" className="loginBtn">
            Login
          </button>
          <div className="bottomLogin">
            <p>Don't have an Account?</p>
            <NavLink to="/signup">Register</NavLink>
          </div>
        </form>
        <img src={bg} alt="background" />
      </div>
    </>
  );
};

export default Login;
