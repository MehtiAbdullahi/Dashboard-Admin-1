import { useTranslation } from "react-i18next";
import OrderBox from "../OrderBox/OrderBox";
import style from "./Orderlists.module.css";
import classNames from "classnames";

function Orderlists() {
  const {t} = useTranslation()

  return (
    <>
      <h1>{t('orderLists.title')}</h1>
      <div className={style["order-filters__wrapper"]}>
        <div className={style["order-filters"]}>
          <div className={style["filter-icon"]}>
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5 9.75C15.8848 9.75 20.25 7.73528 20.25 5.25C20.25 2.76472 15.8848 0.75 10.5 0.75C5.11522 0.75 0.75 2.76472 0.75 5.25C0.75 7.73528 5.11522 9.75 10.5 9.75Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.75 5.25C0.75253 9.76548 3.85614 13.688 8.25 14.729V21C8.25 22.2426 9.25736 23.25 10.5 23.25C11.7426 23.25 12.75 22.2426 12.75 21V14.729C17.1439 13.688 20.2475 9.76548 20.25 5.25"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className={style["filter-date"]}>
            <span>{t('orderLists.filterList.date')}</span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={style["filter__order-type"]}>
            <span>{t('orderLists.filterList.orderType')}</span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={style["filter__order-status"]}>
            <span>{t('orderLists.filterList.orderStatus')}</span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={style["filter__reset-filter"]}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z"
                fill="#EA0234"
              />
            </svg>
            <span>{t('orderLists.filterList.resetFilter')}</span>
          </div>
        </div>
      </div>
      <div className={style["order-lists__wrapper"]}>
        <div className={style["order-lists__top-wrapper"]}>
          <div className={style["table"]}>
            <div className={classNames(style["order-lists__top"], style["thead"])}>
              <div className={style["tr"]}>
                <span className={style["th"]}>{t('orderLists.productTable.id')}</span>
                <span className={style["th"]}>{t('orderLists.productTable.name')}</span>
                <span className={style["th"]}>{t('orderLists.productTable.address')}</span>
                <span className={style["th"]}>{t('orderLists.productTable.date')}</span>
                <span className={style["th"]}>{t('orderLists.productTable.type')}</span>
                <span className={style["th"]}>{t('orderLists.productTable.status')}</span>
              </div>
            </div>
            <div className={classNames(style["order-lists__body"], style["tbody"])}>
              <OrderBox status={"Completed"} />
              <OrderBox status={"Processing"} />
              <OrderBox status={"Rejected"} />
              <OrderBox status={"On-Hold"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orderlists;
