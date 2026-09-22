import React, { useState } from "react";
import style from "./Help.module.css";

export default function HelpWidget({ FAQ }) {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className={style["hw-root"]} dir="rtl">
          <div className={style["hw-widget"]}>
            <div className={style["hw-trigger"]}>
              <span className={style["hw-mark"]}>?</span>
            </div>

            <div className={style["hw-bridge"]} />

            <div className={style["hw-panel"]}>
              <div className={style["hw-panel-title"]}>
                چه کمکی از دستم برمیاد؟
                <span onClick={() => setShow((prev) => !prev)}>مخفی کردن</span>
              </div>
              {FAQ?.map((item, i) => (
                <div className={style["hw-item"]} key={i}>
                  <div className={style["hw-q"]}>
                    <span>{item.q}</span>
                    <span className={style["hw-chevron"]} />
                  </div>
                  <div className={style["hw-answer-wrap"]}>
                    <div className={style["hw-answer"]}>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
