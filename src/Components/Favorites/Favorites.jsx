import { Link } from "react-router-dom";
import style from "./Favorites.module.css";
import ProductBox from "../ProductBox/ProductBox";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";

function Favorites() {
  const { loading, error, products } = useSelector((state) => state.products);
  const {t} = useTranslation()

  return (
    <>
      <h1>{t('favorite.title')}</h1>
      <div className={style["product-boxs"]}>
        {loading && <Loader />}
        {error && <Error titleKey={`noProducts`}/>}
        {!loading &&
          !error &&
          products.map((product) => <ProductBox {...product} />)}
      </div>
    </>
  );
}

export default Favorites;
