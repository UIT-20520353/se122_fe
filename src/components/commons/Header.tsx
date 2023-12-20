import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import default_avatar from "../../assets/images/avatar.png";
import "./Header.style.css";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className="header">
      <Link to={"/"} className="header__logo header__left">
        <img className="logo" src={logo} alt="logo" />
        <div className="website-name">
          <p>Ielts Tinder</p>
          <p>Communication</p>
        </div>
      </Link>

      <div className="header__right">
        <div className="header__actions">
          <IoNotificationsOutline className="header__icon" />
          <AiOutlineMessage className="header__icon" />
        </div>
        <div className="header__profile">
          <div className="user-detail">
            <p>
              Hello, <span>Xuan Vuong</span>
            </p>
            <p>User</p>
          </div>
          <img className="avatar" src={default_avatar} alt="avatar" />

          <div className="dropdown-menu">
            <div className="">
              <p>Profile</p>
            </div>
            <div className="">
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
