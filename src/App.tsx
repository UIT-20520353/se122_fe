import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/home/pages";
import { NotFoundPage } from "./components/commons";
import CalendarPage from "./features/calendar/Calendar";
import { Matching } from "./features/matching/Matching";
import Profile from "./features/profile/Profile";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route path={"/matching"} element={<Matching />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
