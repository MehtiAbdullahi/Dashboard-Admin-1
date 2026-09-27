import { useTranslation } from "react-i18next";
import OrderBox from "../OrderBox/OrderBox";
import style from "./Table.module.css";
import classNames from "classnames";

function Table() {
  const {t} = useTranslation()

  return (
    <>
      <h1>{t("table.title")}</h1>

      <div className={style["table-wrapper"]}>
        {/* ==================== ORDER TABLE ==================== */}
        <div className={style["table-order__border"]}>
          <div className={style["table-order__wrapper"]}>
            <div className={style["table-order__top-wrapper"]}>
              <div className={style["table"]}>
                <div
                  className={classNames(
                    style["table-order__top"],
                    style["thead"],
                  )}
                >
                  <div className={style["tr"]}>
<span className={style["th"]}>{t("table.id")}</span>
<span className={style["th"]}>{t("table.name")}</span>
<span className={style["th"]}>{t("table.address")}</span>
<span className={style["th"]}>{t("table.date")}</span>
<span className={style["th"]}>{t("table.type")}</span>
<span className={style["th"]}>{t("table.status")}</span>
                  </div>
                </div>

                {/* Body */}
                <div
                  className={classNames(
                    style["table-order__body"],
                    style["tbody"],
                  )}
                >
                  <OrderBox status="Completed" />
                  <OrderBox status="Processing" />
                  <OrderBox status="Rejected" />
                  <OrderBox status="On-Hold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PRODUCT STOCK TABLE ==================== */}
        <div className={style["all-lists__wrapper"]}>
          <div
            className={classNames(
              style["product-stock__wrapper"],
              style["table"],
            )}
          >
            {/* Header */}
            <div
              className={classNames(
                style["product-stock__top"],
                style["thead"],
              )}
            >
              <div className={style["tr"]}>
<span className={style["th"]}>{t("table.image")}</span>
<span className={style["th"]}>{t("table.productName")}</span>
<span className={style["th"]}>{t("table.category")}</span>
<span className={style["th"]}>{t("table.price")}</span>
<span className={style["th"]}>{t("table.piece")}</span>
<span className={style["th"]}>{t("table.availableColor")}</span>
<span className={style["th"]}>{t("table.action")}</span>
              </div>
            </div>

            {/* Body */}
            <div
              className={classNames(
                style["product-stock__body"],
                style["tbody"],
              )}
            >
              <div
                className={classNames(style["product-stock__box"], style["tr"])}
              >
                {/* Image */}
                <div className={style["td"]}>
                  <span className={style["product-stock__img"]}>
                    <img src="image/Products/watch 2.png" alt="Apple Watch Series 4" />
                  </span>
                </div>

                {/* Product Name */}
                <span className={style["td"]}>Apple Watch Series 4</span>

                {/* Category */}
                <span className={style["td"]}>Digital Product</span>

                {/* Price */}
                <span className={style["td"]}>$690.00</span>

                {/* Piece */}
                <span className={style["td"]}>63</span>

                {/* Colors */}
                <div className={style["td"]}>
                  <div className={style["product-colors"]}>
                    <span
                      className={classNames(
                        style["product-color"],
                        style["black"],
                      )}
                    />

                    <span
                      className={classNames(
                        style["product-color"],
                        style["gray"],
                      )}
                    />

                    <span
                      className={classNames(
                        style["product-color"],
                        style["red"],
                      )}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className={style["td"]}>
                  <div className={style["product__edit-delet"]}>
                    <span>
                      {/* Edit */}
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.6">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.79693 9.52467L6.32227 9.87867L6.6756 7.40334L13.0396 1.03934C13.6254 0.453551 14.5751 0.453551 15.1609 1.03934C15.7467 1.62513 15.7467 2.57488 15.1609 3.16067L8.79693 9.52467Z"
                            stroke="black"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M12.332 1.74667L14.4534 3.86801"
                            stroke="black"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          <path
                            d="M12.5996 9.60067V14.6007C12.5996 15.153 12.1519 15.6007 11.5996 15.6007H1.59961C1.04732 15.6007 0.599609 15.153 0.599609 14.6007V4.60067C0.599609 4.04839 1.04732 3.60067 1.59961 3.60067H6.59961"
                            stroke="black"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>

                      {/* Delete */}
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.6 15H4.2C3.53726 15 3 14.4627 3 13.8V3H13.8V13.8C13.8 14.4627 13.2627 15 12.6 15Z"
                          stroke="#EF3826"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M6.60117 11.4V6.6"
                          stroke="#EF3826"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M10.2008 11.4V6.6"
                          stroke="#EF3826"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M0.599609 3H16.1996"
                          stroke="#EF3826"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.2004 0.599998H6.60039C5.93765 0.599998 5.40039 1.13726 5.40039 1.8V3H11.4004V1.8C11.4004 1.13726 10.8631 1.13726 10.2004 0.599998Z"
                          stroke="#EF3826"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
