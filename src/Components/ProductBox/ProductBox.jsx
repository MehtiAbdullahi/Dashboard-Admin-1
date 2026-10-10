import { Link } from "react-router-dom";
import style from "./ProductBox.module.css";
import Rating from "../Rating/Rating";
import { useTranslation } from "react-i18next";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { FaSpinner } from "react-icons/fa";
import { toggleFavorite } from "../../Redux/Store/Products";

function ProductBox({
  id,
  title,
  price,
  image,
  rate,
  rate_count,
  getIdAsProduct,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.allUsers);
  const { products, favoriteLoading } = useSelector((state) => state.products);

  const { favorite_products } = users.find((u) => u.id === user.id);
  const isFavorite = favorite_products.some((fp) => fp.id === id);

  const addFavoriteProduct = (id) => {
    const product = products.find((p) => p.id === id);

    dispatch(
      toggleFavorite({
        product,
        userId: user.id,
      }),
    );
  };

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
          <div
            className={classNames(
              style["product-favorite__icon"],
              isFavorite && style["active"],
            )}
            onClick={() => addFavoriteProduct(id)}
          >
            <span>
              {favoriteLoading ? (
                <FaSpinner className={style["loading-icon"]} />
              ) : isFavorite ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </span>
          </div>
        </div>
        <div className={style["product__stars-rating"]}>
          <div className={style["product-stars"]}>
            <Rating rate={rate} />
          </div>
          <span className={style["product__rating-number"]}>
            ( {rate_count} )
          </span>
        </div>
        <div className={style["product__edit-btn"]}>
          <Link onClick={() => getIdAsProduct(id)}>
            <span>{t("products.editProduct")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
