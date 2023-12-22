import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { NotFoundPage } from "./components/commons";
import { Loading } from "./components/commons/Loading";
import MainLayout from "./components/layouts/MainLayout";
import CalendarPage from "./features/calendar/pages";
import Calling from "./features/calling/pages";
import HomePage from "./features/home/pages";
import Login from "./features/login/pages";
import Matching from "./features/matching/pages";
import ProfilePage from "./features/profile/pages";
import Register from "./features/register/pages";
import { selectLoading } from "./redux/globalSlice";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="calling" element={<Calling />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="matching" element={<Matching />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      {loading > 0 && <Loading />}
    </React.Fragment>
  );
};

export default App;
