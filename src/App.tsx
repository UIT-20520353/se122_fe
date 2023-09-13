import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/home/pages";
import { NotFoundPage } from "./components/commons";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
