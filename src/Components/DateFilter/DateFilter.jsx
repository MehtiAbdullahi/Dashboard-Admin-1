import { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import style from "./DateFilter.module.css";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function DatePicker({ onApply, showCalender }) {
  const { t } = useTranslation();

  // ماهی که در حال حاضر در تقویم نمایش داده می‌شود
  const [currentDate, setCurrentDate] = useState(new Date());

  // تاریخ‌هایی که کاربر انتخاب کرده
  const [selectedDates, setSelectedDates] = useState([]);

  // تاریخ امروز
  const today = new Date();

  /*
   * ساخت روزهای تقویم
   */
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // اولین روز ماه
    const firstDay = new Date(year, month, 1);

    // روز هفته اولین روز ماه
    // Sunday = 0
    // Monday = 1
    // ...
    const firstDayOfWeek = firstDay.getDay();

    // تعداد روزهای ماه فعلی
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    // تعداد روزهای ماه قبلی
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const days = [];

    /*
     * روزهای ماه قبلی
     */
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPreviousMonth - i,
        monthOffset: -1,
      });
    }

    /*
     * روزهای ماه فعلی
     */
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push({
        day,
        monthOffset: 0,
      });
    }

    /*
     * روزهای ماه بعد
     *
     * 42 یعنی 6 ردیف × 7 روز
     */
    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        monthOffset: 1,
      });
    }

    return days;
  }, [currentDate]);

  /*
   * رفتن به ماه قبل
   */
  const handlePreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  /*
   * رفتن به ماه بعد
   */
  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  /*
   * انتخاب یا حذف یک تاریخ
   */
  const handleDateClick = (day, monthOffset) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const clickedDate = new Date(year, month + monthOffset, day);

    /*
     * تبدیل تاریخ به فرمت:
     *
     * 2026-02-14
     */
    const dateKey = [
      clickedDate.getFullYear(),
      String(clickedDate.getMonth() + 1).padStart(2, "0"),
      String(clickedDate.getDate()).padStart(2, "0"),
    ].join("-");

    setSelectedDates((prev) => {
      /*
       * اگر قبلاً انتخاب شده،
       * انتخابش را بردار
       */
      if (prev.includes(dateKey)) {
        return prev.filter((date) => date !== dateKey);
      }

      /*
       * اگر انتخاب نشده،
       * اضافه‌اش کن
       */
      return [...prev, dateKey];
    });
  };

  /*
   * Apply
   */
  const handleApply = () => {
    if (onApply) {
      onApply(selectedDates);
    }
  };

  /*
   * عنوان ماه
   *
   * مثلاً:
   * February 2026
   */
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={classNames(style.calendar, showCalender && style.show)}>
      {/* =========================
          Header
      ========================= */}

      <div className={style.header}>
        <h3>{monthName}</h3>

        <div className={style.navigation}>
          {/* Previous Month */}

          <button
            type="button"
            onClick={handlePreviousMonth}
            className={style.navButton}
            aria-label="Previous month"
          >
            <IoChevronBack />
          </button>

          {/* Next Month */}

          <button
            type="button"
            onClick={handleNextMonth}
            className={style.navButton}
            aria-label="Next month"
          >
            <IoChevronForward />
          </button>
        </div>
      </div>

      {/* =========================
          Calendar Body
      ========================= */}

      <div className={style.calendarBody}>
        {/* Week Days */}

        <div className={style.weekDays}>
          {WEEK_DAYS.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>

        {/* Dates */}

        <div className={style.days}>
          {calendarDays.map((item, index) => {
            const year = currentDate.getFullYear();

            const month = currentDate.getMonth();

            /*
             * تاریخ واقعی این خانه
             */
            const date = new Date(year, month + item.monthOffset, item.day);

            /*
             * کلید تاریخ
             */
            const dateKey = [
              date.getFullYear(),
              String(date.getMonth() + 1).padStart(2, "0"),
              String(date.getDate()).padStart(2, "0"),
            ].join("-");

            /*
             * آیا انتخاب شده؟
             */
            const isSelected = selectedDates.includes(dateKey);

            /*
             * آیا متعلق به ماه فعلی است؟
             */
            const isCurrentMonth = item.monthOffset === 0;

            /*
             * آیا امروز است؟
             */
            const isToday =
              date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate();

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(item.day, item.monthOffset)}
                className={`
                    ${style.day}

                    ${!isCurrentMonth ? style.otherMonth : ""}

                    ${isToday ? style.today : ""}

                    ${isSelected ? style.selected : ""}
                  `}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================
          Footer
      ========================= */}

      <div className={style.footer}>
        <p>*{t("orderLists.filterList.date.text")}</p>

        <button
          type="button"
          className={style.applyButton}
          onClick={handleApply}
        >
          {t("orderLists.filterList.date.btn")}
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
