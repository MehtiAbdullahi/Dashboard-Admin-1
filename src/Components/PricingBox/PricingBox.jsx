import { Link } from "react-router-dom";
import style from "./PricingBox.module.css";
import { useTranslation } from "react-i18next";

function PricingBox({ title, price, has_options, none_options }) {
  const { t } = useTranslation();

  return (
    <div className={style["pricing-box"]}>
      <div className={style["pricing-box__texts-wrapper"]}>
        <div className={style["pricing-box__top"]}>
          <h4>{t(`subscription.${title}.title`)}</h4>
          <h5>{t("subscription.text")}</h5>
          <span className={style["pricing-box__price"]}>${price}</span>
        </div>
        <div className={style["pricing-box__body"]}>
          {has_options?.map((text) => (
            <span>{t(`subscription.options.${text}`)}</span>
          ))}
          {none_options?.map((text) => (
            <p>{t(`subscription.options.${text}`)}</p>
          ))}
        </div>
        <div className={style["pricing-box__bottom"]}>
          <Link>
            <span>{t("subscription.textBtn")}</span>
          </Link>
          <span>{t("subscription.text2")}</span>
        </div>
      </div>
    </div>
  );
}

export default PricingBox;
