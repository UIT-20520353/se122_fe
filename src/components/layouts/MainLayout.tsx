import React from "react";
import { Header, Sidebar } from "../commons";
import { Outlet } from "react-router";
import useProtectedRoute from "../../hooks/useProtectedRoute";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  useProtectedRoute();

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
