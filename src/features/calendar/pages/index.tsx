import React, { useState } from "react";
import type { Dayjs } from 'dayjs';
import { Calendar, Modal } from 'antd';
import type { CalendarProps } from 'antd';
import "./Calendar.style.css";
import dayjs from 'dayjs';
import NewScheduleModal from "./NewScheduleModal";

interface ICalendarProps {}

const CalendarPage: React.FunctionComponent<ICalendarProps> = () => {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const HandleSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log(newValue.format('YYYY-MM-DD'));
    setIsOpen(true);
  };

  const handleOk = () => {}
  const handleCancel = () => {setIsOpen(false)}

  return <div className="calendar-page">
    <div className="calendarWrapper">
        <Calendar onPanelChange={onPanelChange} onSelect={HandleSelect}/>
        <Modal title="Basic Modal" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Meeting with Anna...</p>
          <p>Meeting with Christian...</p>
          <p>Meeting with Killian...</p>
        </Modal>
      </div>
  </div>;
};

export default CalendarPage;
