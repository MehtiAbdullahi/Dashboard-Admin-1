import { Link } from "react-router-dom";
import style from "./StatusPage.module.css";

function NotAccessPage() {
  return (
    <>
      <div className={style["not-access__wrapper"]}>
        <div className={style["not-access"]}>
          <div className={style["not-access__box"]}>
            <img src="/public/image/Bg/404.png" alt="" />
            <div className="not-access__box-bottom">
              <h2 className={style["not-access__title"]}>
                You do not have access to this page!
              </h2>
              <Link
                onClick={() => localStorage.clear()}
                to="/login"
                className={style["not-access__btn"]}
              >
                Back To Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotAccessPage;
