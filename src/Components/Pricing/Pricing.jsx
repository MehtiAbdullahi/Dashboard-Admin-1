import { Link } from "react-router-dom";
import style from "./Pricing.module.css";
import PricingBox from "../PricingBox/PricingBox";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Pricing() {
  const {t} = useTranslation()
  const pricings = useSelector((state) => state.pricing);

  return (
    <>
      <h1>{t('subscription.title')}</h1>
      <div className={style["pricing-box__wrapper"]}>
        {pricings.map((item) => (
          <PricingBox {...item} />
        ))}
      </div>
    </>
  );
}

export default Pricing;
