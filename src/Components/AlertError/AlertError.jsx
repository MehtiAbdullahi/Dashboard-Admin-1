import { MdErrorOutline } from "react-icons/md";
import style from "./AlertError.module.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function AlertError({ type, keyError, err, warning, setHasError }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      key="box"
    >
      <div dir="rtl" role="alert" className={style["alert"]}>
        <div className={style["alert-container"]}>
          <div className={style["alert-border"]}></div>

          <div className={style["alert-content"]}>
            <div className={style["alert-icon-wrapper"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffcc00"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>

            <div className={style["alert-text"]}>
              <p className={style["alert-title"]}>
                {t(`alertError.${type}.title`)}
              </p>

              <p className={style["alert-message"]}>
                {t(`alertError.${type}.text`)}
              </p>
            </div>

            <button
              aria-label="بستن هشدار"
              className={style["alert-close-button"]}
              onClick={() => setHasError((prev) => ({ ...prev, [keyError]: false }))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className={style["alert-progress-container"]}>
            <div className={style["alert-progress"]}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AlertError;
