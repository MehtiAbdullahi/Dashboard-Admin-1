import { Link } from "react-router-dom";

import style from "./Calender.module.css";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CalenderLibrary from "../CalenderLibrary/CalenderLibrary";
import { useSelector } from "react-redux";

function Calender() {
  const { t } = useTranslation();
  const events = useSelector((state) => state.events);

  return (
    <>
      <h1>{t("calender.title")}</h1>

      <div className={style["calender-wrapper"]}>
        <div className={style["calender-left"]}>
          <Link className={style["calender-left__btn"]}>
            <span>+ {t("calender.events.btn")}</span>
          </Link>

          <div className={style["calender__event-wrapper"]}>
            <h3>{t("calender.events.title")}</h3>

            <div className={style["calender-events"]}>
              {events.map(({ type }) => (
                <div className={style["calender-event"]}>
                  <div className={style["event-message__side-left"]}>
                    <img src="/public/image/event-image.png" alt="" />
                  </div>

                  <div className={style["event-message__side-right"]}>
                    <span className={style["event-title"]}>
                      {t(`calender.events.${type}.title`)}
                    </span>
                    <span className={style["event-time"]}>
                      {t(`calender.events.${type}.date`)}
                    </span>
                    <span className={style["event-address"]}>
                      {t(`calender.events.${type}.address`)}
                    </span>
                    <span className={style["event-location"]}>
                      {t(`calender.events.${type}.location`)}
                    </span>

                    <div className={style["event-participants"]}>
                      <img src="/public/image/Man Image.png" alt="" />
                      <img src="/public/image/Man Image-1.png" alt="" />
                      <img src="/public/image/Man Image-2.png" alt="" />
                      <span className={style["event__participants-more"]}>
                        26+
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={style["calender-event__btn"]}>
              <Link>
                <span>{t("calender.events.btn2")}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className={style["calender-right"]}>
          <div className={style["calender-right__top-body"]}>
            <CalenderLibrary />
          </div>
        </div>
      </div>
    </>
  );
}

export default Calender;
