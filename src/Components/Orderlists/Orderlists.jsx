import { useTranslation } from "react-i18next";
import OrderBox from "../OrderBox/OrderBox";
import style from "./Orderlists.module.css";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import DatePicker from "../DateFilter/DateFilter";
import { useState } from "react";
import OrderStatusFilter from "../OrderStatusFilter/OrderStatusFilter";
import OrderTypeFilter from "../OrderTypeFilter/OrderTypeFilter";

function Orderlists() {
  const { t } = useTranslation();

  const [showCalender, setShowCalender] = useState(false);
  const [showOrderType, setShowOrderType] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);

  return (
    <>
      <h1>{t("orderLists.title")}</h1>
      <div className={style["order-filters__wrapper"]}>
        <div className={style["order-filters"]}>
          <div
            className={style["filter-icon"]}
            onClick={() => setShowFiltersMenu(!showFiltersMenu)}
          >
            <CiFilter />
          </div>
          <div className={classNames(style["filters-wrapper"], showFiltersMenu && style["show"])}>
            <div className={style["filter-date__wrapper"]}>
              <div
                className={style["filter-date"]}
                onClick={() => {
                  setShowCalender(!showCalender);
                  setShowOrderType(false);
                  setShowOrderStatus(false);
                }}
              >
                <span>{t("orderLists.filterList.date.title")}</span>
                <FaChevronDown className={showCalender && style.show} />
              </div>
              <DatePicker showCalender={showCalender} />
            </div>
            <div
              className={style["filter__order-type-wrapper"]}
              onClick={() => {
                setShowOrderType(!showOrderType);
                setShowCalender(false);
                setShowOrderStatus(false);
              }}
            >
              <div className={style["filter__order-type"]}>
                <span>{t("orderLists.filterList.orderType.title")}</span>
                <FaChevronDown className={showOrderType && style.show} />
              </div>
              <OrderTypeFilter showOrderType={showOrderType} />
            </div>
            <div
              className={style["filter__order-status-wrapper"]}
              onClick={() => {
                setShowOrderStatus(!showOrderStatus);
                setShowOrderType(false);
                setShowCalender(false);
              }}
            >
              <div className={style["filter__order-status"]}>
                <span>{t("orderLists.filterList.orderStatus.title")}</span>
                <FaChevronDown className={showOrderStatus && style.show} />
              </div>
              <OrderStatusFilter showOrderStatus={showOrderStatus} />
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
              <span>{t("orderLists.filterList.resetFilter")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style["order-lists__wrapper"]}>
        <div className={style["order-lists__top-wrapper"]}>
          <div className={style["table"]}>
            <div
              className={classNames(style["order-lists__top"], style["thead"])}
            >
              <div className={style["tr"]}>
                <span className={style["th"]}>
                  {t("orderLists.productTable.id")}
                </span>
                <span className={style["th"]}>
                  {t("orderLists.productTable.name")}
                </span>
                <span className={style["th"]}>
                  {t("orderLists.productTable.address")}
                </span>
                <span className={style["th"]}>
                  {t("orderLists.productTable.date")}
                </span>
                <span className={style["th"]}>
                  {t("orderLists.productTable.type")}
                </span>
                <span className={style["th"]}>
                  {t("orderLists.productTable.status")}
                </span>
              </div>
            </div>
            <div
              className={classNames(style["order-lists__body"], style["tbody"])}
            >
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
