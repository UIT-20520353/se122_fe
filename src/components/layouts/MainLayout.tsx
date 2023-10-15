import React from "react";
import { Header, Sidebar } from "../commons";
import { Outlet } from "react-router";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="flex-row align-start">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
