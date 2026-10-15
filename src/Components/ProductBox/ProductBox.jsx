import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { FaRegHeart, FaSpinner } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import style from "./ProductBox.module.css";
import Rating from "../Rating/Rating";
import { toggleFavorite } from "../../Redux/Store/Products";
import EditProductModal from "../EditProductModal/EditProductModal";

function ProductBox({
  id,
  title,
  price,
  image,
  rate,
  rate_count,
  hasEditBtn = true,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState();

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

  const openModalHandler = (id) => {
    setModalId(id);
    setOpenModal(true);
  };

  return (
    <>
      {openModal && (
        <EditProductModal
          productId={modalId}
          closeModalUpdate={() => setOpenModal(false)}
        />
      )}
      <div className={style["product-box"]}>
        <div className={style["product-box__top"]}>
          <img src={image} alt="" loading="lazy" decoding="async" />
        </div>
        <div className={style["product-box__bottom"]}>
          <div className={style["product-info"]}>
            <div className={style["product__title-price"]}>
              <h3 title={title}>{title}</h3>
              <h4>${price}</h4>
            </div>
            <button
              type="button"
              className={classNames(
                style["product-favorite__icon"],
                isFavorite && style["active"],
              )}
              aria-pressed={isFavorite}
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
            </button>
          </div>
          <div className={style["product__stars-rating"]}>
            <div className={style["product-stars"]}>
              <Rating rate={rate} />
            </div>
            <span className={style["product__rating-number"]}>
              ( {rate_count} )
            </span>
          </div>
          {hasEditBtn && (
            <div className={style["product__edit-btn"]}>
              <Link onClick={() => openModalHandler(id)}>
                <span>{t("products.editProduct")}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductBox;