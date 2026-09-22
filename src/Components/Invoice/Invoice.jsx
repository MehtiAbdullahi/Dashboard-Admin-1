import { Link } from "react-router-dom";
import style from "./Invoice.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

function Invoice() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("invoice.title")}</h1>
      <div className={style["invoice-wrapper"]}>
        <div className={style["invoice-top"]}>
          <div className={style["invoice-from"]}>
            <span>{t("invoice.from")}</span>
            <h4>Virginia Walker</h4>
            <p>9694 Krajcik Locks Suite 635</p>
          </div>
          <div className={style["invoice-to"]}>
            <span>{t("invoice.to")}</span>
            <h4>Austin Miller</h4>
            <p>Brookview</p>
          </div>
          <div className={style["invoice-date"]}>
            <span>{t("invoice.invoiceDate")}</span>
            <span>{t("invoice.dueDate")}</span>
          </div>
        </div>
        <div
          className={classNames(style["invoice-body__wrapper"], style["table"])}
        >
          <div
            className={classNames(style["invoice-body__top"], style["thead"])}
          >
            <div className={style["tr"]}>
              <span className={style["th"]}>{t("invoice.serialNo")}</span>
              <span className={style["th"]}>{t("invoice.description")}</span>
              <span className={style["th"]}>{t("invoice.quantity")}</span>
              <span className={style["th"]}>{t("invoice.baseCost")}</span>
              <span className={style["th"]}>{t("invoice.totalCost")}</span>
            </div>
          </div>
          <div
            className={classNames(style["invoice-body__body"], style["tbody"])}
          >
            <div className={style["tr"]}>
              <span className={style["td"]}>1</span>
              <span className={style["td"]}>Children Toy</span>
              <span className={style["td"]}>2</span>
              <span className={style["td"]}>$20</span>
              <span className={style["td"]}>$80</span>
            </div>
          </div>
        </div>
        <div className={style["invoice-body__total-price"]}>
          <span>{t("invoice.total")}</span>
          <span>$4680</span>
        </div>
        <div className={style["invoice-body__submit-print"]}>
          <Link className={style["invoice-body__btn-print"]}>
            <span className={style["btn-print__icon"]}>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.6 0H14.4V3.6H3.6V0ZM2.7 4.5H15.3C16.794 4.5 18 5.706 18 7.2V12.6H14.4V16.2H3.6V12.6H0V7.2C0 5.706 1.206 4.5 2.7 4.5ZM5.4 14.4H12.6V9.9H5.4V14.4ZM15.3 8.1C14.805 8.1 14.4 7.695 14.4 7.2C14.4 6.705 14.805 6.3 15.3 6.3C15.795 6.3 16.2 6.705 16.2 7.2C16.2 7.695 15.795 8.1 15.3 8.1Z"
                  fill="#202224"
                />
              </svg>
            </span>
          </Link>
          <Link className={style["invoice-body__btn-submit"]}>
            <span className={style["btn-submit__icon"]}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.505108 7.31596L5.45038 8.55227L6.6867 13.4976C6.83853 14.1048 7.66798 14.187 7.93596 13.6213L13.936 0.954585C14.2041 0.388468 13.6142 -0.201458 13.0481 0.0667023L0.381407 6.0667C-0.184318 6.33468 -0.102185 7.16413 0.505108 7.31596ZM6.16182 7.35577L2.6357 6.47423L11.9319 2.07078L7.52842 11.367L6.64689 7.84084C6.58718 7.60198 6.40068 7.41548 6.16182 7.35577Z"
                  fill="white"
                />
                <mask
                  id="mask0_0_4869"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="15"
                  height="15"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.505108 7.31596L5.45038 8.55227L6.6867 13.4976C6.83853 14.1048 7.66798 14.187 7.93596 13.6213L13.936 0.954585C14.2041 0.388468 13.6142 -0.201458 13.0481 0.0667021L0.381407 6.0667C-0.184317 6.33468 -0.102185 7.16413 0.505108 7.31596ZM6.16182 7.35577L2.6357 6.47423L11.9319 2.07078L7.52842 11.367L6.64689 7.84084C6.58718 7.60198 6.40068 7.41548 6.16182 7.35577Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_0_4869)"></g>
              </svg>
            </span>
            <span>{t("invoice.send")}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Invoice;
