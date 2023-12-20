import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../assets/images/logo.png";
import "./Header.style.css";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="logo" src={logo} alt="logo" />
      </div>

      <IoNotificationsOutline className="header__icon" />
    </div>
  );
};

export { Header };
