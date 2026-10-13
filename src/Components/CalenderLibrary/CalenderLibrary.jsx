import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

const headerToolbar = {
  left: "today",
  center: "prev,title,next",
  right: "dayGridMonth,timeGridWeek,timeGridDay",
};

function CalenderLibrary() {
  const { t } = useTranslation();
  const events = useSelector((state) => state.events);

  return (
    <FullCalendar
      plugins={calendarPlugins}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={headerToolbar}
      buttonText={{
        today: t("calender.calender.today"),
        month: t("calender.calender.month"),
        week: t("calender.calender.week"),
        day: t("calender.calender.day"),
      }}
    />
  );
}

export default CalenderLibrary;