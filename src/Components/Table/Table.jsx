import { useTranslation } from "react-i18next";
import OrderBox from "../OrderBox/OrderBox";
import style from "./Table.module.css";
import classNames from "classnames";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function Table() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("table.title")}</h1>

      <div className={style["table-wrapper"]}>
        {/* ==================== ORDER TABLE ==================== */}
        <div className={style["table-order__border"]}>
          <div className={style["table-order__wrapper"]}>
            <div
              className={style["table-order__top-wrapper"]}
              role="region"
              aria-label={t("table.title")}
              tabIndex={0}
            >
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
                    <img
                      src="image/Products/watch_2.png"
                      alt="Apple Watch Series 4"
                      width="55"
                      height="55"
                      loading="lazy"
                    />
                  </span>
                </div>

                {/* Product Name */}
                <span
                  className={style["td"]}
                  data-label={t("table.productName")}
                >
                  Apple Watch Series 4
                </span>

                {/* Category */}
                <span className={style["td"]} data-label={t("table.category")}>
                  Digital Product
                </span>

                {/* Price */}
                <span className={style["td"]} data-label={t("table.price")}>
                  $690.00
                </span>

                {/* Piece */}
                <span className={style["td"]} data-label={t("table.piece")}>
                  63
                </span>

                {/* Colors */}
                <div
                  className={style["td"]}
                  data-label={t("table.availableColor")}
                >
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
                      <FaEdit />

                      {/* Delete */}
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classNames(style["product-stock__box"], style["tr"])}
              >
                {/* Image */}
                <div className={style["td"]}>
                  <span className={style["product-stock__img"]}>
                    <img
                      src="image/Products/watch_2.png"
                      alt="Apple Watch Series 4"
                      width="55"
                      height="55"
                      loading="lazy"
                    />
                  </span>
                </div>

                {/* Product Name */}
                <span
                  className={style["td"]}
                  data-label={t("table.productName")}
                >
                  Apple Watch Series 4
                </span>

                {/* Category */}
                <span className={style["td"]} data-label={t("table.category")}>
                  Digital Product
                </span>

                {/* Price */}
                <span className={style["td"]} data-label={t("table.price")}>
                  $690.00
                </span>

                {/* Piece */}
                <span className={style["td"]} data-label={t("table.piece")}>
                  63
                </span>

                {/* Colors */}
                <div
                  className={style["td"]}
                  data-label={t("table.availableColor")}
                >
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
                      <FaEdit />

                      {/* Delete */}
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classNames(style["product-stock__box"], style["tr"])}
              >
                {/* Image */}
                <div className={style["td"]}>
                  <span className={style["product-stock__img"]}>
                    <img
                      src="image/Products/watch_2.png"
                      alt="Apple Watch Series 4"
                      width="55"
                      height="55"
                      loading="lazy"
                    />
                  </span>
                </div>

                {/* Product Name */}
                <span
                  className={style["td"]}
                  data-label={t("table.productName")}
                >
                  Apple Watch Series 4
                </span>

                {/* Category */}
                <span className={style["td"]} data-label={t("table.category")}>
                  Digital Product
                </span>

                {/* Price */}
                <span className={style["td"]} data-label={t("table.price")}>
                  $690.00
                </span>

                {/* Piece */}
                <span className={style["td"]} data-label={t("table.piece")}>
                  63
                </span>

                {/* Colors */}
                <div
                  className={style["td"]}
                  data-label={t("table.availableColor")}
                >
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
                      <FaEdit />

                      {/* Delete */}
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classNames(style["product-stock__box"], style["tr"])}
              >
                {/* Image */}
                <div className={style["td"]}>
                  <span className={style["product-stock__img"]}>
                    <img
                      src="image/Products/watch_2.png"
                      alt="Apple Watch Series 4"
                      width="55"
                      height="55"
                      loading="lazy"
                    />
                  </span>
                </div>

                {/* Product Name */}
                <span
                  className={style["td"]}
                  data-label={t("table.productName")}
                >
                  Apple Watch Series 4
                </span>

                {/* Category */}
                <span className={style["td"]} data-label={t("table.category")}>
                  Digital Product
                </span>

                {/* Price */}
                <span className={style["td"]} data-label={t("table.price")}>
                  $690.00
                </span>

                {/* Piece */}
                <span className={style["td"]} data-label={t("table.piece")}>
                  63
                </span>

                {/* Colors */}
                <div
                  className={style["td"]}
                  data-label={t("table.availableColor")}
                >
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
                      <FaEdit />

                      {/* Delete */}
                      <RiDeleteBin6Line />
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
