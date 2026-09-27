import { useState } from "react";
import styles from "./OrderStatusFilter.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const ORDER_STATUSES = [
  {
    id: 1,
    title: "orderLists.filterList.orderStatus.items.text",
    key: "Completed",
  },
  {
    id: 2,
    title: "orderLists.filterList.orderStatus.items.text2",
    key: "Processing",
  },
  {
    id: 3,
    title: "orderLists.filterList.orderStatus.items.text3",
    key: "Rejected",
  },
  {
    id: 4,
    title: "orderLists.filterList.orderStatus.items.text4",
    key: "On Hold",
  },
  {
    id: 5,
    title: "orderLists.filterList.orderStatus.items.text5",
    key: "In Transit",
  },
];

export default function OrderStatusFilter({
  defaultSelected = [],
  onApply,
  showOrderStatus,
}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(defaultSelected);

  const toggle = (status) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleApply = () => {
    onApply?.(selected);
  };

  return (
    <div className={classNames(styles.box, showOrderStatus && styles.show)}>
      <h3 className={styles.title}>
        {t("orderLists.filterList.orderStatus.title")}
      </h3>

      <div className={styles.options}>
        {ORDER_STATUSES.map(({ id, title, key }) => {
          const isActive = selected.includes(status);
          return (
            <button
              key={id}
              type="button"
              className={`${styles.pill} ${isActive ? styles.pillActive : ""}`}
              onClick={() => toggle(key)}
            >
              {t(title)}
            </button>
          );
        })}
      </div>

      <div className={styles.divider} />

      <p className={styles.note}>
        *{t("orderLists.filterList.orderStatus.text")}
      </p>

      <button type="button" className={styles.applyBtn} onClick={handleApply}>
        {t("orderLists.filterList.orderStatus.btn")}
      </button>
    </div>
  );
}
