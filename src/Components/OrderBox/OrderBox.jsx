import style from "./OrderBox.module.css";
import classNames from "classnames";

function OrderBox({ status }) {
  return (
    <div className={style["tr"]}>
      <span className={classNames(style["td"], style["order-id"])}>1</span>

      <span className={classNames(style["td"], style["order-name"])}>
        Christine Brooks
      </span>

      <span className={classNames(style["td"], style["order-address"])}>
        089 Kutch Green Apt. 448
      </span>

      <span className={classNames(style["td"], style["oder-date"])}>
        04 Sep 2026
      </span>

      <span className={classNames(style["td"], style["order-type"])}>
        Electric
      </span>

      <div
        className={classNames(
          style["td"],
          style["order-status"],
          style[status],
        )}
      >
        <span>{status}</span>
      </div>
    </div>
  );
}

export default OrderBox;
