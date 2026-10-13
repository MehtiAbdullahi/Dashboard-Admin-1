import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MdErrorOutline, MdWarningAmber, MdClose } from "react-icons/md";
import cx from "classnames";
import style from "./AlertError.module.css";

const DURATION = 5000;

function AlertError({
  type,
  keyError,
  err,
  warning = false,
  setHasError,
  duration = DURATION,
  className,
}) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const variant = warning ? "warning" : "error";
  const Icon = warning ? MdWarningAmber : MdErrorOutline;

  const handleClose = () =>
    setHasError((prev) => ({ ...prev, [keyError]: false }));

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -16,
      scale: reduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 28,
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.94,
      height: 0,
      marginBlockEnd: 0,
      transition: { duration: 0.22, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: reduceMotion ? 0 : -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 500, damping: 16 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.28, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      key="box"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ width: "100%", overflow: "visible" }}
    >
      <div
        role="alert"
        aria-live="assertive"
        className={cx(style["alert"], style[`variant-${variant}`], className)}
        style={{ "--alert-duration": `${duration}ms` }}
      >
        <div className={style["card"]}>
          <motion.div variants={iconVariants} className={style["icon-wrapper"]}>
            <Icon className={style["icon"]} aria-hidden="true" />
          </motion.div>

          <div className={style["text"]}>
            <motion.p variants={textVariants} className={style["title"]}>
              {t(`alertError.${type}.title`)}
            </motion.p>

            <motion.p variants={textVariants} className={style["message"]}>
              {t(`alertError.${type}.text`)}
            </motion.p>
          </div>

          <button
            type="button"
            aria-label={t("alertError.close", "بستن هشدار")}
            className={style["close-button"]}
            onClick={handleClose}
          >
            <MdClose className={style["close-icon"]} aria-hidden="true" />
          </button>

          <div className={style["progress-track"]} aria-hidden="true">
            <div className={style["progress"]} onAnimationEnd={handleClose} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AlertError;
