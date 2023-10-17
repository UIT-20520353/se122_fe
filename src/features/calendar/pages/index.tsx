import React from "react";
import type { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import "./Calendar.style.css";

interface ICalendarProps {}

const CalendarPage: React.FunctionComponent<ICalendarProps> = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <div className="calendar-page">
    <div className="calendarWrapper">
        <button className="btnAdd">Add</button>
        <Calendar onPanelChange={onPanelChange} />
      </div>
  </div>;
};

export default CalendarPage;
