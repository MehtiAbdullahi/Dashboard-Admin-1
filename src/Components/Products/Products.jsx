import { Link } from "react-router-dom";
import style from "./Products.module.css";
import ProductBox from "../ProductBox/ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts, updateProduct } from "../../Redux/Store/Products";
import HelpWidget from "../Help/Help";
import Loader from "../Loader/Loader";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";

function Products() {
  const { t } = useTranslation();
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [productID, setProductID] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputImage, setInputImage] = useState("");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("https://fakestoreapi.com/products"));
  }, []);

  const updateProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        uel: `https://fakestoreapi.com/products/${productID}`,
        ProductData: {
          id: productID,
          title: inputTitle,
          price: inputPrice,
          description: inputDescription,
          category: inputCategory,
          image: inputImage,
        },
      }),
    );
    changeStatusShowModal();
  };

  const getIdAsProduct = (id) => {
    setProductID(id);
    changeStatusShowModal();
  };

  const changeStatusShowModal = () => {
    setShowUpdateProduct((prev) => !prev);
  };

  return (
    <>
      {/* {showUpdateProduct ? (
        <UpdateProductModal
          changeStatusShowModal={changeStatusShowModal}
          updateProductHandler={updateProductHandler}
          setInputTitle={setInputTitle}
          setInputPrice={setInputPrice}
          setInputDescription={setInputDescription}
          setInputCategory={setInputCategory}
        />
      ) : (
        ""
      )} */}
      <HelpWidget
        FAQ={[
          {
            q: "چرا هیچ محصولی نیست؟",
            a: "اگر محصولی لود نشده است از فیلتر شکن استفاده کنید",
          },
        ]}
      />
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
      <div className={style["product-boxs"]}>
        {loading && <Loader />}
        {error && <Error titleKey={"noProducts"} />}
        {!loading &&
          !error &&
          products.map((product) => (
            <ProductBox
              key={product.id}
              {...product}
              getIdAsProduct={getIdAsProduct}
            />
          ))}
      </div>
    </>
  );
}

export default Products;
