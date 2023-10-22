import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import { Calendar, Modal } from "antd";
import type { CalendarProps } from "antd";
import "./Calendar.style.css";
import dayjs from "dayjs";
import {v4 as uuid} from "uuid";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

const uniqueId = () : string => Date.now().toString(36) + uuid();

interface MeetingProps {
  id: string;
  content: string;
}

interface ICalendarProps {}

const CalendarPage: React.FunctionComponent<ICalendarProps> = () => {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newMeetingValue, setNewMeetingValue] = useState<string>("");
  const [meetingList, setMeetingList] = useState<MeetingProps[]>([{content: "Meeting with A", id: uniqueId()}]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<string>('');

  dayjs.extend(customParseFormat);

  const handleChangeTime = (time: Dayjs, timeString: string):void => {
    console.log(time, timeString);
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const handleUpdate = (meetingId: string) => {
    const meeting = meetingList.find(m => m.id === meetingId);
    if (!meeting) return;

    setIsUpdate(true);
    setNewMeetingValue(meeting.content);
    setCurrentMeeting(meetingId);
  };
  const updating = () => {
    if (!currentMeeting) return;

    const result = meetingList.map((item) => {
      if (item.id === currentMeeting)
        return { ...item, content: newMeetingValue };
      else return item;
    });
    setIsUpdate(false);
    setNewMeetingValue("");
    setMeetingList(result);
    setCurrentMeeting('')
  };
  const handleDelete = (item: string) => {
    const result = meetingList.filter((meeting) => {
      return meeting.id !== item;
    });
    setMeetingList(result);
  };
  const handleSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    // console.log(newValue.format("YYYY-MM-DD"));
    setIsOpen(true);
  };

  const handleAdd = () => {
    if (newMeetingValue !== "") {
      setMeetingList((prev) => [...prev, {content: newMeetingValue, id: uniqueId()}]);
      setNewMeetingValue("");
    }
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  return (
    <div className="calendar-page">
      <div className="calendarWrapper">
        <Calendar onPanelChange={onPanelChange} onSelect={handleSelect} />
        <Modal title="Basic Modal" open={isOpen} onOk={handleOk} onCancel={handleOk}>
          <ul>
            {meetingList.map((item) => {
              return (
                <li key={item.id}>
                  {item.content}
                  <button className="newMeetingBtn" onClick={() => handleUpdate(item.id)}>Update</button>
                  <button className="newMeetingBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              );
            })}
          </ul>

          <input
            type="text"
            id="inputMeeting"
            onChange={(e) => setNewMeetingValue(e.target.value)}
            value={newMeetingValue}
            className="newMeetingInput"
          />
          {/* <TimePicker onChange={handleChangeTime} /> */}

          <button className="newMeetingBtn" onClick={() => (isUpdate ? updating() : handleAdd())}>
            {isUpdate ? "Update" : "Add"}
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default CalendarPage;
