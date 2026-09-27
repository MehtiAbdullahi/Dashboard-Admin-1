import { useState } from "react";
import styles from "./OrderTypeFilter.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";


const ORDER_TYPES = [
  {
    id: 1,
    title: "orderLists.filterList.orderType.items.text",
    key: "Health & Medicine",
  },
  {
    id: 2,
    title: "orderLists.filterList.orderType.items.text2",
    key: "Book & Stationary",
  },
  {
    id: 3,
    title: "orderLists.filterList.orderType.items.text3",
    key: "Services & Industry",
  },
  {
    id: 4,
    title: "orderLists.filterList.orderType.items.text4",
    key: "Fashion & Beauty",
  },
  {
    id: 5,
    title: "orderLists.filterList.orderType.items.text5",
    key: "Home & Living",
  },
  {
    id: 6,
    title: "orderLists.filterList.orderType.items.text6",
    key: "Electronics",
  },
  {
    id: 7,
    title: "orderLists.filterList.orderType.items.text7",
    key: "Mobile & Phone",
  },
  {
    id: 8,
    title: "orderLists.filterList.orderType.items.text8",
    key: "Accessories",
  },
];

export default function OrderTypeFilter({
  defaultSelected = [],
  onApply,
  showOrderType,
}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(defaultSelected);

  const toggle = (type) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleApply = () => {
    onApply?.(selected);
  };

  return (
    <div className={classNames(styles.box, showOrderType && styles.show)}>
      <h3 className={styles.title}>
        {t("orderLists.filterList.orderType.title")}
      </h3>

      <div className={styles.options}>
        {ORDER_TYPES.map(({ id, title, key }) => {
          const isActive = selected.includes(key);
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
        *{t("orderLists.filterList.orderType.text")}
      </p>

      <button type="button" className={styles.applyBtn} onClick={handleApply}>
        {t("orderLists.filterList.orderType.btn")}
      </button>
    </div>
  );
}
