import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../consts/app";

interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    removeLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <NavLink className={"sidebar__button"} to={"/"}>
        Home
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/calendar"}>
        Calendar
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/matching"}>
        Matching
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/chat"}>
        Chat
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/profile"}>
        Profile
      </NavLink>
      <button
        style={{ border: 0, outline: "none" }}
        type="button"
        className={"sidebar__button"}
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
};

export { Sidebar };
