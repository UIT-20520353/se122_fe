import React, { Fragment, useEffect } from "react";
import { Header, Sidebar } from "../commons";
import { Outlet } from "react-router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCallNotifcation,
  selectProfile,
  selectUserId,
  setCallNotification,
  setLoading,
  setRequestToCall,
  updateUserProfile,
} from "../../redux/globalSlice";
import { useEffectOnce } from "usehooks-ts";
import authApi from "../../api/authApi";
import { useHandleResponseError } from "../../hooks/useHandleResponseError";
import stompClient from "../socket/stompClient";
import { Frame } from "stompjs";
import { CallRequestResponse } from "../../models/message";
import classNames from "classnames";
import { MdCall } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  useProtectedRoute();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const userId = useAppSelector(selectUserId);
  const profile = useAppSelector(selectProfile);
  const callNotification = useAppSelector(selectCallNotifcation);

  const handleRejectCall = () => {
    dispatch(setCallNotification(null));
    stompClient.send({
      chatroomId: callNotification?.chatroomId || 0,
      message: "",
      type: "REJECT",
      userId,
    });
  };

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
    console.log("a");

    stompClient.connect(
      "http://localhost:8080/ws",
      () => {
        console.log("Websocket connected");
        // stompClient.subcribe(`/user/${profile?.id || 0}/notification`, (message) => {
        //   console.log(message);
        // });
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      stompClient.disconnect();
    };
  });

  useEffect(() => {
    if (profile) {
      stompClient.subcribe(
        `/user/${profile.id}/notification`,
        (response: Frame) => {
          const message: CallRequestResponse = JSON.parse(response.body);
          if (message.type === "CALL") dispatch(setCallNotification(message));
          else if (message.type === "CANCEL")
            dispatch(setCallNotification(null));
          else if (message.type === "REJECT") {
            dispatch(setRequestToCall(null));
          }
        }
      );
    }
    return () => {
      stompClient.ubsubcribe(`/user/${profile?.id || 0}/notification`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  return (
    <Fragment>
      <div className="main-layout">
        <Header />
        <Sidebar />
        <Outlet />
      </div>
      <div
        className={classNames("overlay-call-notification", {
          show: callNotification,
        })}
      >
        {callNotification && (
          <div className="modal-call-notification">
            <img src={callNotification.avatar} />
            <span className="name">{callNotification.name}</span>
            <span className="calling-label">send request to call...</span>
            <div className="modal-call-notification__footer">
              <button className="btn-accept">
                <MdCall />
              </button>
              <button className="btn-cancel" onClick={handleRejectCall}>
                <FaXmark />
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MainLayout;
