import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../assets/images/react.svg";
import "./Header.style.css";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" />
        <h2 className="title">Ielts Tinder</h2>
      </div>

      <div className="searchInput">
        <div className="input-group flex-nowrap">
          <span
            className="input-group-text customSearchInput"
            id="addon-wrapping"
          >
            Search User
          </span>
          <input
            type="text"
            className="form-control customSearchInput"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>

      <IoNotificationsOutline className="header__icon" />
    </div>
  );
};

export { Header };
