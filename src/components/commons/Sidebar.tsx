import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
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
      <NavLink className={"sidebar__button"} to={"/profile"}>
        Profile
      </NavLink>
    </div>
  );
};

export { Sidebar };
