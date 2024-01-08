import React, { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { selectProfile } from "../../../redux/globalSlice";

interface ICallingProps {}

const Calling: React.FunctionComponent<ICallingProps> = () => {
  const profile = useAppSelector(selectProfile);
  const [roomId, setRoomId] = useState<string | null>(null);

  const handleCreateRoom = async () => {
    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      JSON.stringify({}),
      {
        headers: {
          Authorization: `${profile?.token || ""}`,
          "Content-Type": "application/json",
        },
      }
    );

    setRoomId(response.data.roomId);
  };

  return roomId ? (
    <MeetingProvider
      config={{
        meetingId: roomId,
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
      <div className="call-page">dasdadasd</div>
    </MeetingProvider>
  ) : (
    <div>
      <button onClick={handleCreateRoom}>Create room</button>
    </div>
  );
};

export default Calling;
