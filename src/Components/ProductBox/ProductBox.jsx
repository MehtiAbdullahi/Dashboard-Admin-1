import { Link } from "react-router-dom";
import style from "./ProductBox.module.css";
import Rating from "../Rating/Rating";
import { useTranslation } from "react-i18next";

function ProductBox({ id, title, price, image, rating, getIdAsProduct }) {
  const { t } = useTranslation();

  return (
    <div className={style["product-box"]}>
      <div className={style["product-box__top"]}>
        {/* <div className={style["right-left__arrow"]}>
          <span className={style["arrow-right"]}>
            <svg
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16016 10.59L3.58016 6L8.16016 1.41L6.75016 0L0.750156 6L6.75016 12L8.16016 10.59Z"
                fill="#363636"
              />
            </svg>
          </span>
          <span className={style["arrow-left"]}>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z"
                fill="#363636"
              />
            </svg>
          </span>
        </div> */}
        <img src={image} alt="" />
      </div>
      <div className={style["product-box__bottom"]}>
        <div className={style["product-info"]}>
          <div className={style["product__title-price"]}>
            <h3>{title} </h3>
            <h4>${price}</h4>
          </div>
          <div className={style["product-favorite__icon"]}>
            <span>
              <svg
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.18771 15.5148L16.3787 8.01483C17.6749 6.71969 17.9961 4.74012 17.176 3.10158V3.10158C16.5642 1.87849 15.4019 1.02398 14.052 0.80497C12.7021 0.585957 11.3293 1.02914 10.3622 1.99608L9.18771 3.16983L8.01321 1.99608C7.04616 1.02914 5.67328 0.585957 4.3234 0.80497C2.97352 1.02398 1.81118 1.87849 1.19946 3.10158V3.10158C0.380482 4.73942 0.701309 6.71755 1.99596 8.01258L9.18771 15.5148Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className={style["product__stars-rating"]}>
          <div className={style["product-stars"]}>
            <Rating rate={rating.rate} />
          </div>
          <span className={style["product__rating-number"]}>
            ( {rating.count} )
          </span>
        </div>
        <div className={style["product__edit-btn"]}>
          <Link onClick={() => getIdAsProduct(id)}>
            <span>{t('products.editProduct')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
