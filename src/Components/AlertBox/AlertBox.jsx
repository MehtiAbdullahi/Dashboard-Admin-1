import React, { useEffect, useState } from "react";
import style from "./AlertBox.module.css";

/**
 * AppAlert — جایگزین سبک و شخصی‌سازی‌شده‌ی SweetAlert
 * هرجای پروژه ایمپورت و با props رندرش کنید؛ ثابت در گوشه‌ی بالا-چپ
 * صفحه می‌شینه: آیکون سمت چپ باکس، پیغام سمت راستش.
 *
 * استفاده:
 *   import AppAlert from "./AppAlert";
 *   import { FaCheckCircle } from "react-icons/fa";
 *
 *   <AppAlert
 *     icon={<FaCheckCircle />}
 *     type="success"                 // success | error | warning | info
 *     message="عملیات با موفقیت انجام شد."
 *     duration={4000}                // اختیاری؛ صفر یا نداشتنش یعنی خودکار بسته نشه
 *     onClose={() => setAlert(null)}
 *     index={0}                      // برای نمایش چند alert پشت‌سرهم (اختیاری)
 *   />
 */

const THEME = {
  success: {
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.35)",
    bg1: "#0c1f1a",
    bg2: "#0a1512",
  },
  error: {
    accent: "#fb7185",
    glow: "rgba(251, 113, 133, 0.35)",
    bg1: "#241014",
    bg2: "#170a0d",
  },
  warning: {
    accent: "#f5b841",
    glow: "rgba(245, 184, 65, 0.35)",
    bg1: "#241a0c",
    bg2: "#170f07",
  },
  info: {
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.35)",
    bg1: "#0c1a24",
    bg2: "#081420",
  },
};

export default function AlertBox({
  icon,
  message,
  type = "info",
  duration = 4000,
  onClose,
  index = 0,
}) {
  const [closing, setClosing] = useState(false);
  const theme = THEME[type] || THEME.info;

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose && onClose(), 380);
  };

  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(handleClose, duration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div
      className="aa-root"
      style={{
        top: 22 + index * 84,
        "--accent": theme.accent,
        "--glow": theme.glow,
        "--bg1": theme.bg1,
        "--bg2": theme.bg2,
        "--dur": `${duration}ms`,
      }}
    >
      <div className={style[`aa-box${closing ? " aa-closing" : ""}`]}>
        <div className={style["aa-icon-wrap"]}>{icon}</div>
        <div className={style["aa-message"]}>{message}</div>
        <button
          className={style["aa-close"]}
          onClick={handleClose}
          aria-label="بستن"
        >
          ✕
        </button>
        {!!duration && <div className={style["aa-progress"]} />}
      </div>
    </div>
  );
}
