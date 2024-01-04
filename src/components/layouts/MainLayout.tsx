import React from "react";
import { Header, Sidebar } from "../commons";
import { Outlet } from "react-router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectProfile,
  setLoading,
  updateUserProfile,
} from "../../redux/globalSlice";
import { useEffectOnce } from "usehooks-ts";
import authApi from "../../api/authApi";
import { useHandleResponseError } from "../../hooks/useHandleResponseError";
import stompClient from "../socket/stompClient";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  useProtectedRoute();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const profile = useAppSelector(selectProfile);

  const fetchData = async () => {
    dispatch(setLoading("ADD"));

    const { ok, body, error } = await authApi.getProfile();
    if (ok && body) {
      dispatch(updateUserProfile(body));
      dispatch(setLoading("REMOVE"));
      return;
    }

    dispatch(setLoading("REMOVE"));
    handleResponseError(error);
  };

  useEffectOnce(() => {
    fetchData();
    stompClient.connect(
      "http://localhost:8080/ws",
      () => {
        console.log("Websocket connected");
        stompClient.subcribe(`/user/${profile?.id || 0}/private`, (message) => {
          console.log(message);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  });

  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
