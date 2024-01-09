import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

interface ControlsProps {}

const Controls: React.FunctionComponent<ControlsProps> = () => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
};

export default Controls;
