import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../assets/images/react.svg";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
        <h2 className="title">Ielts Tinder</h2>
      </div>
      <IoNotificationsOutline className="header__icon" />
    </div>
  );
};

export { Header };
