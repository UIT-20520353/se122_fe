import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectProfile,
  selectisStartedCall,
  setStartedCall,
} from "../../../redux/globalSlice";
import MeetingView from "../components/MeetingView";

interface ICallingProps {}

const Calling: React.FunctionComponent<ICallingProps> = () => {
  const profile = useAppSelector(selectProfile);
  const isStartedCall = useAppSelector(selectisStartedCall);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLeaveCall = () => {
    dispatch(setStartedCall(null));
    navigate("/");
  };

  useEffectOnce(() => {
    if (!isStartedCall) navigate("/");
  });

  return isStartedCall ? (
    <MeetingProvider
      config={{
        meetingId: isStartedCall,
        micEnabled: true,
        webcamEnabled: true,
        name: `${profile?.first_name || ""} ${profile?.last_name || ""}`,
        participantId: `${profile?.id || 0}`,
        multiStream: true,
        mode: "CONFERENCE", // "CONFERENCE" || "VIEWER"
        metaData: {},
      }}
      token={profile?.token || ""}
      joinWithoutUserInteraction // Boolean
    >
      <MeetingView onMeetingLeave={onLeaveCall} meetingId={isStartedCall} />
    </MeetingProvider>
  ) : null;
};

export default Calling;
