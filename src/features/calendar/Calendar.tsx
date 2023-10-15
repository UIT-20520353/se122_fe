import React from "react";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import "./Calendar.style.css";
import type { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import "./Calendar.style.css";

interface ICalendarPageProps {}

const CalendarPage: React.FunctionComponent<ICalendarPageProps> = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <>
    <Header />
    <div className="mainLayout">
      <Menu />
      <div className="calendarWrapper">
        <button className="btnAdd">Add</button>
        <Calendar onPanelChange={onPanelChange} />
      </div>
    </div>
  </>;
};

export default CalendarPage;
