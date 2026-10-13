import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import style from "./Calender.module.css";
import CalenderLibrary from "../CalenderLibrary/CalenderLibrary";

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
              {events.map(({ id, type }, index) => (
                <div key={id ?? index} className={style["calender-event"]}>
                  <div className={style["event-message__side-left"]}>
                    <img
                      src="image/event-image.png"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
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
                      <img
                        src="image/Man Image.png"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src="image/Man Image-1.png"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src="image/Man Image-2.png"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
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