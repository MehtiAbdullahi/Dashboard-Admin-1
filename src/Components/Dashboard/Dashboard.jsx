import style from "./Dashboard.module.css";
import ReChart from "../ReChart/ReChart";
import classNames from "classnames";
import Input from "../Input/Input";
import HelpWidget from "../Help/Help";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Store/Products";
import Loader from "../Loader/Loader";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("https://fakestoreapi.com/products"));
  }, []);

  return (
    <>
      <HelpWidget
        FAQ={[
          {
            q: "آیا داشبورد تکمیل هست؟",
            a: "خیر این داشبورد در حال توسعه هستش",
          },
          {
            q: "1. مهم",
            a: `این داشبورد با بک اند supabase توسعه پیدا کرده است.`,
          },
          {
            q: "2. مهم",
            a: `این داشبورد فعلا قابلیت login , signup و اپدیت اطلاعات اکانت رو داره`,
          },
        ]}
      />
      <h1>{t("dashboard.title")}</h1>
      <div className={style["statistics-total__wrapper"]}>
        <div className={style["statistics-total__box"]}>
          <div className={style["statistics-box__top"]}>
            <div className={style["statistics-box__texts"]}>
              <h5>{t("dashboard.totalUser")}</h5>
              <h2>40,689</h2>
            </div>

            <span>
              <img src="/public/image/Icon-3.png" alt="" />
            </span>
          </div>

          <div className={style["statistics-box__bottom"]}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                fill="#00B69B"
              />
            </svg>

            <span className={style["statistics-box__percent"]}>8.5%</span>

            <span className={style["statistics-box__text-time"]}>
              {t("dashboard.upFromYesterday")}
            </span>
          </div>
        </div>

        <div className={style["statistics-total__box"]}>
          <div className={style["statistics-box__top"]}>
            <div className={style["statistics-box__texts"]}>
              <h5>{t("dashboard.totalOrder")}</h5>
              <h2>10293</h2>
            </div>

            <span>
              <img src="/public/image/Icon-2.png" alt="" />
            </span>
          </div>

          <div className={style["statistics-box__bottom"]}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                fill="#00B69B"
              />
            </svg>

            <span className={style["statistics-box__percent"]}>1.3%</span>

            <span className={style["statistics-box__text-time"]}>
              {t("dashboard.upFromYesterday")}
            </span>
          </div>
        </div>

        <div className={style["statistics-total__box"]}>
          <div className={style["statistics-box__top"]}>
            <div className={style["statistics-box__texts"]}>
              <h5>{t("dashboard.totalSales")}</h5>
              <h2>$89,000</h2>
            </div>

            <span>
              <img src="/public/image/Icon-1.png" alt="" />
            </span>
          </div>

          <div className={style["statistics-box__bottom"]}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
                fill="#F93C65"
              />
            </svg>

            <span
              className={classNames(
                style["statistics-box__percent"],
                style["bad"],
              )}
            >
              4.3%
            </span>

            <span className={style["statistics-box__text-time"]}>
              {t("dashboard.downFromYesterday")}
            </span>
          </div>
        </div>

        <div className={style["statistics-total__box"]}>
          <div className={style["statistics-box__top"]}>
            <div className={style["statistics-box__texts"]}>
              <h5>{t("dashboard.totalPending")}</h5>
              <h2>2040</h2>
            </div>

            <span>
              <img src="/public/image/Icon.png" alt="" />
            </span>
          </div>

          <div className={style["statistics-box__bottom"]}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                fill="#00B69B"
              />
            </svg>

            <span className={style["statistics-box__percent"]}>1.8%</span>

            <span className={style["statistics-box__text-time"]}>
              {t("dashboard.upFromYesterday")}
            </span>
          </div>
        </div>
      </div>

      <div className={style["sales-chart__wrapper"]}>
        <div className={style["sales-chart__top"]}>
          <h2>{t("dashboard.salesDetails")}</h2>
        </div>
        <ReChart />
      </div>

      <div className={style["deals-details__wrapper"]}>
        <div className={style["deals-details__top"]}>
          <h2>{t("dashboard.dealsDetails")}</h2>

          <div className={style["deals-details__top-icon"]}>
            <span>October</span>

            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.85892 0.268115L5 4.29356L1.14108 0.268115C0.836791 -0.0819238 0.532503 -0.0892166 0.228216 0.246237C-0.076072 0.581691 -0.076072 0.909853 0.228216 1.23072L4.54357 5.78123C4.65422 5.92708 4.80636 6 5 6C5.19364 6 5.34578 5.92708 5.45643 5.78123L9.77178 1.23072C10.0761 0.909853 10.0761 0.581691 9.4675 -0.0892166 9.16321 -0.0819238Z"
                fill="#2B3034"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        <div className={style["deals-details__table-wrapper"]}>
          <div
            className={classNames(
              style["deals-details__table"],
              style["thead"],
            )}
          >
            <div className={style["tr"]}>
              <span className={style["th"]}>{t("dashboard.productName")}</span>
              <span className={style["th"]}>{t("dashboard.Location")}</span>
              <span className={style["th"]}>
                {t("dashboard.rate")}-{t("dashboard.count")}
              </span>
              <span className={style["th"]}>{t("dashboard.category")}</span>
              <span className={style["th"]}>{t("dashboard.amount")}</span>
              <span className={style["th"]}>{t("dashboard.status")}</span>
            </div>
          </div>
          <div
            className={classNames(
              style["deals-details__items"],
              style["tbody"],
            )}
          >
            {loading && <Loader />}
            {error && <Error titleKey={`noProducts`} />}
            {!loading &&
              !error &&
              products.map(({ title, price, rating, category, image }) => (
                <div
                  className={classNames(
                    style["deals-details__item-box"],
                    style["tr"],
                  )}
                >
                  <span className={style["td"]}>
                    <div className={style["deals-details__box-img"]}>
                      <img src={image} alt="" />
                      <span>{title}</span>
                    </div>
                  </span>

                  <span className={style["td"]}>6096 Marjolaine Landing</span>

                  <span className={style["td"]}>
                    {rating.rate} - {rating.count}
                  </span>

                  <span className={style["td"]}>{category}</span>

                  <span className={style["td"]}>${price}</span>

                  <div className={style["td"]}>
                    <span className={style["deals-details__box-btn"]}>
                      {t("dashboard.Delivered")}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
