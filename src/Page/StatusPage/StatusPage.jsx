import { Link } from "react-router-dom";
import style from "./StatusPage.module.css";
import { useTranslation } from "react-i18next";

function StatusPage({ notaccess, message }) {
  const { t } = useTranslation();

  return (
    <>
      <div className={style["not-access__wrapper"]}>
        <div className={style["not-access"]}>
          <div className={style["not-access__box"]}>
            <img src="image/Bg/404.png" alt="" />
            <div className="not-access__box-bottom">
              <h2 className={style["not-access__title"]}>
                {t("statusPage.notaccess.title")}
              </h2>
              <Link
                onClick={() => localStorage.clear()}
                to="/login"
                className={style["not-access__btn"]}
              >
                {t("statusPage.btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatusPage;
