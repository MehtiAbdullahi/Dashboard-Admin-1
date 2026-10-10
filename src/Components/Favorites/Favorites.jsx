import { Link } from "react-router-dom";
import style from "./Favorites.module.css";
import ProductBox from "../ProductBox/ProductBox";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";
import HelpWidget from "../Help/Help";

function Favorites() {
  const { loading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.allUsers);

  const { favorite_products } = users.find((u) => u.id === user.id);

  const { t } = useTranslation();

  return (
    <>
      <HelpWidget
        FAQ={[
          {
            q: "چرا محصولی لود نمیشه؟",
            a: "لطفا از وی پی ان استفاده کنید!",
          },
        ]}
      />
      <h1>{t("favorite.title")}</h1>
      <div className={style["product-boxs"]}>
        {loading && <Loader />}
        {error && <Error titleKey={`noProducts`} />}
        {!loading &&
          !error &&
          favorite_products &&
          favorite_products.map((product) => <ProductBox {...product} />)}
        {favorite_products.length === 0 && <Error titleKey={`favoriteProductEmpty`} />}
      </div>
    </>
  );
}

export default Favorites;
