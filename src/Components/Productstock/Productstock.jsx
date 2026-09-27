import { useTranslation } from "react-i18next";
import style from "./Productstock.module.css";
import classNames from "classnames";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function Productstock() {
  const { t } = useTranslation();

  return (
    <>
      <div className={style["product-stock__header"]}>
        <h1>{t("productStock.title")}</h1>
        <span className={style["product-stock__top-input"]}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.1441 11.9863C11.8739 10.8261 13.1464 7.67265 11.9863 4.94282C10.8261 2.21298 7.67265 0.940497 4.94281 2.10065C2.21297 3.2608 0.94049 6.41426 2.10064 9.1441C3.2608 11.8739 6.41426 13.1464 9.1441 11.9863Z"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.8408 10.8407L15.0061 15.0066"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <input type="text" placeholder={t("productStock.placeHolder")} />
        </span>
      </div>
      <div
        className={classNames(style["product-stock__wrapper"], style["table"])}
      >
        <div
          className={classNames(style["product-stock__top"], style["thead"])}
        >
          <div className={style["tr"]}>
            <span className={style["th"]}>{t("productStock.table.iamge")}</span>
            <span className={style["th"]}>
              {t("productStock.table.productName")}
            </span>
            <span className={style["th"]}>
              {t("productStock.table.category")}
            </span>
            <span className={style["th"]}>{t("productStock.table.price")}</span>
            <span className={style["th"]}>{t("productStock.table.piece")}</span>
            <span className={style["th"]}>
              {t("productStock.table.availableColor")}
            </span>
            <span className={style["th"]}>
              {t("productStock.table.actions")}
            </span>
          </div>
        </div>

        <div
          className={classNames(style["product-stock__body"], style["tbody"])}
        >
          <div className={classNames(style["product-stock__box"], style["tr"])}>
            <div className={style["td"]}>
              <span className={style["product-stock__img"]}>
                <img src="/public/image/Products/watch 2.png" alt="" />
              </span>
            </div>
            <span className={style["td"]}>Apple Watch Series 4</span>
            <span className={style["td"]}>Digital Product</span>
            <span className={style["td"]}>$690.00</span>
            <span className={style["td"]}>63</span>
            <div className={style["td"]}>
              <div className={style["product-colors"]}>
                <span
                  className={classNames(style["product-color"], style["black"])}
                ></span>
                <span
                  className={classNames(style["product-color"], style["gray"])}
                ></span>
                <span
                  className={classNames(style["product-color"], style["red"])}
                ></span>
              </div>
            </div>
            <div className={style["td"]}>
              <div className={style["product__edit-delet"]}>
                <span>
                  <FaEdit />
                  <RiDeleteBin6Line />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Productstock;
