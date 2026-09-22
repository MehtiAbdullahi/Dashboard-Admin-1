import { useTranslation } from "react-i18next";
import style from "./Productstock.module.css";
import classNames from "classnames";

function Productstock() {
  const {t} = useTranslation()

  return (
    <>
      <div className={style["product-stock__header"]}>
        <h1>{t('productStock.title')}</h1>
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
          <input type="text" placeholder={t('productStock.placeHolder')} />
        </span>
      </div>
      <div
        className={classNames(style["product-stock__wrapper"], style["table"])}
      >
        <div
          className={classNames(style["product-stock__top"], style["thead"])}
        >
          <div className={style["tr"]}>
            <span className={style["th"]}>{t('productStock.table.iamge')}</span>
            <span className={style["th"]}>{t('productStock.table.productName')}</span>
            <span className={style["th"]}>{t('productStock.table.category')}</span>
            <span className={style["th"]}>{t('productStock.table.price')}</span>
            <span className={style["th"]}>{t('productStock.table.piece')}</span>
            <span className={style["th"]}>{t('productStock.table.availableColor')}</span>
            <span className={style["th"]}>{t('productStock.table.actions')}</span>
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
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.6">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.79693 9.52467L6.32227 9.87867L6.6756 7.40334L13.0396 1.03934C13.6254 0.453551 14.5751 0.453551 15.1609 1.03934C15.7467 1.62513 15.7467 2.57488 15.1609 3.16067L8.79693 9.52467Z"
                        stroke="black"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.332 1.74667L14.4534 3.86801"
                        stroke="black"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.5996 9.60067V14.6007C12.5996 15.153 12.1519 15.6007 11.5996 15.6007H1.59961C1.04732 15.6007 0.599609 15.153 0.599609 14.6007V4.60067C0.599609 4.04839 1.04732 3.60067 1.59961 3.60067H6.59961"
                        stroke="black"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.6 15H4.2C3.53726 15 3 14.4627 3 13.8V3H13.8V13.8C13.8 14.4627 13.2627 15 12.6 15Z"
                      stroke="#EF3826"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.60117 11.4V6.6"
                      stroke="#EF3826"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.2008 11.4V6.6"
                      stroke="#EF3826"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M0.599609 3H16.1996"
                      stroke="#EF3826"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.2004 0.599998H6.60039C5.93765 0.599998 5.40039 1.13726 5.40039 1.8V3H11.4004V1.8C11.4004 1.13726 10.8631 0.599998 10.2004 0.599998Z"
                      stroke="#EF3826"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
