import { Link } from "react-router-dom";
import style from "./Products.module.css";
import ProductBox from "../ProductBox/ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPage } from "../../Redux/Store/Products";
import Loader from "../Loader/Loader";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";
import { useCallback, useEffect } from "react";

function Products() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const {
    paginatedProducts,
    paginationLoading,
    paginationError,
    totalProducts,
    currentPage,
    pageSize,
  } = useSelector((state) => state.products);

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = useCallback(
    (page) => {
      dispatch(getProductsPage({ page, pageSize }));
    },
    [dispatch, pageSize],
  );

  useEffect(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  return (
    <div className={style["products-wrapper"]}>
      <h1>{t("products.title")}</h1>
      <div className={style["featured-wrapper"]}>
        <div className={style["featured-texts"]}>
          <h5>September 12-22</h5>
          <h2>{t("products.featuredTitle")}</h2>
          <h6>{t("products.featuredText")}</h6>
          <Link>
            <span>{t("products.getStarted")}</span>
          </Link>
        </div>
        <div className={style["right-left__arrow"]}>
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
        </div>
      </div>
      {paginationLoading && <Loader />}
      {paginationError && <Error titleKey={"noProducts"} />}
      <div className={style["product-boxs"]}>
        {!paginationLoading &&
          !paginationError &&
          paginatedProducts?.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
      </div>
      {!paginationLoading && !paginationError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={4}
        />
      )}
    </div>
  );
}

export default Products;
