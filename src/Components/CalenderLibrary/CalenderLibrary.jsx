import "./CalenderLibrary.module.css";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function CalenderLibrary() {
  const { t } = useTranslation();
  const events = useSelector((state) => state.events);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: "today",
        center: "prev,title,next",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: `${t("calender.calender.today")}`,
        month: `${t("calender.calender.month")}`,
        week: `${t("calender.calender.week")}`,
        day: `${t("calender.calender.day")}`,
      }}
    />
  );
}

export default CalenderLibrary;
