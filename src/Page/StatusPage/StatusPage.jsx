import { Link, useNavigate } from "react-router-dom";
import style from "./StatusPage.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Store/authSlice";

function StatusPage({ notaccess, message }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackLogin = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    navigate("/login");
  };

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
                onClick={handleBackLogin}
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
