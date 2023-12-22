import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCalendar } from "react-icons/fi";

interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  return (
    <div className="sidebar">
      <NavLink className={"sidebar__button"} to={"/"}>
        <FiHome className={"icon"} />
        Home
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/calendar"}>
        <FiCalendar className={"icon"} />
        Calendar
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/matching"}>
        Matching
      </NavLink>
    </div>
  );
};

export { Sidebar };
