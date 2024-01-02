import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { NotFoundPage } from "./components/commons";
import { Loading } from "./components/commons/Loading";
import MainLayout from "./components/layouts/MainLayout";
import CommunicationLayout from "./features/communication/layouts/CommunicationLayout";
import { Recommend, Received, Friend } from "./features/communication/pages";
import HomePage from "./features/home/pages";
import Login from "./features/login/pages";
import PracticePage from "./features/practice/pages";
import Register from "./features/register/pages";
import { selectLoading } from "./redux/globalSlice";
import { Sent } from "./features/communication/pages/Sent";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="communication" element={<CommunicationLayout />}>
            <Route index element={<Recommend />} />
            <Route path="received" element={<Received />} />
            <Route path="sent" element={<Sent />} />
            <Route path="friend" element={<Friend />} />
          </Route>
          <Route path="practice" element={<PracticePage />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
      {loading > 0 && <Loading />}
    </React.Fragment>
  );
};

export default App;
