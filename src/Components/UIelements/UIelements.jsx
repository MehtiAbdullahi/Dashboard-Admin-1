import { useTranslation } from "react-i18next";
import style from "./UIelements.module.css";

function UIelements() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("uIElements.title")}</h1>
      <div className={style["uielements-wrapper"]}>
        <div className={style["uielements__bar-chart"]}>
          <span>{t("uIElements.barChart")}</span>
          <div className={style["bar-chart__items"]}>
            <img src="image/More/Bar 1.png" alt="" />
            <img src="image/More/Bar 2.png" alt="" />
            <img src="image/More/Bar 3.png" alt="" />
            <img src="image/More/Bar 4.png" alt="" />
          </div>
        </div>
        <div className={style["uielements__pie-chart"]}>
          <span>{t("uIElements.pieChart")}</span>
          <div className={style["pie-chart__items"]}>
            <img src="image/More/Pie 1.png" alt="" />
            <img src="image/More/Pie 2.png" alt="" />
            <img src="image/More/Pie 3.png" alt="" />
            <img src="image/More/Pie 4.png" alt="" />
          </div>
        </div>
        <div className={style["uielements__donut-chart"]}>
          <span>{t("uIElements.donutChart")}</span>
          <div className={style["donut-chart__items"]}>
            <img src="image/More/1.png" alt="" />
            <img src="image/More/2.png" alt="" />
            <img src="image/More/3.png" alt="" />
            <img src="image/More/4.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UIelements;
