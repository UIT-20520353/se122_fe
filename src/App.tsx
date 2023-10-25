import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/home/pages";
import { NotFoundPage } from "./components/commons";
import MainLayout from "./components/layouts/MainLayout";
import ProfilePage from "./features/profile/pages";
import Matching from "./features/matching/pages";
import CalendarPage from "./features/calendar/pages";
import Matched from "./features/matched/pages";
import Login from "./features/login/pages";
import Register from "./features/register/pages";
import Calling from "./features/calling/pages";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="calling" element={<Calling />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="matching" element={<Matching />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
