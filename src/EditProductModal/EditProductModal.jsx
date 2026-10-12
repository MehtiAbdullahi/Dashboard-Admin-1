import {
  FiX,
  FiUploadCloud,
  FiTag,
  FiDollarSign,
  FiAlignLeft,
  FiSave,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import style from "./EditProductModal.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function EditProductModal({ product, closeModalUpdate }) {
  const { t } = useTranslation();
  const { products } = useSelector((state) => state.products);
  const currentProduct = products.find((p) => p.id === product);
  const { title, price, image } = currentProduct;

  return (
    <div className={style["modal-overlay"]}>
      <div
        className={style["modal"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
      >
        {/* Header */}
        <div className={style["modal__header"]}>
          <div className={style["modal__header-text"]}>
            <h2 id="edit-product-title">
              {t("products.productEditBox.title")}
            </h2>
            <p>{t("products.productEditBox.caption")}</p>
          </div>
          <button
            type="button"
            className={style["modal__close"]}
            aria-label="بستن"
            onClick={closeModalUpdate}
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className={style["modal__body"]}>
          {/* Image */}
          <div className={style["image-section"]}>
            <div className={style["image-preview"]}>
              <img src={image} alt="" />
            </div>
            <div className={style["image-actions"]}>
              <span className={style["image-actions__label"]}>
                {t("products.productEditBox.imgTitle")}
              </span>
              <p className={style["image-actions__hint"]}>
                {t("products.productEditBox.imgCaption")}
              </p>
              <button type="button" className={style["upload-btn"]}>
                <FiUploadCloud />
                <span>{t("products.productEditBox.imgBtn")}</span>
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className={style["form"]}>
            <div className={style["field"]}>
              <label>{t("products.productEditBox.productTitle")}</label>
              <div className={style["input-wrapper"]}>
                <FiTag className={style["input-icon"]} />
                <input
                  type="text"
                  defaultValue={title}
                  placeholder={t("products.productEditBox.imgCaption")}
                />
              </div>
            </div>

            <div className={style["field-row"]}>
              <div className={style["field"]}>
                <label>{t("products.productEditBox.productPrice")}</label>
                <div className={style["input-wrapper"]}>
                  <FiDollarSign className={style["input-icon"]} />
                  <input
                    type="number"
                    defaultValue={price}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className={style["field"]}>
                <label>{t("products.productEditBox.productCategory")}</label>
                <div className={style["input-wrapper"]}>
                  <MdOutlineCategory className={style["input-icon"]} />
                  <select defaultValue="" disabled>
                    <option value="" disabled>
                      {t("products.productEditBox.titleOption")}
                    </option>
                    <option>{t("products.productEditBox.titleOption1")}</option>
                    <option>{t("products.productEditBox.titleOption2")}</option>
                    <option>{t("products.productEditBox.titleOption3")}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={style["field"]}>
              <label>{t("products.productEditBox.productDesTitle")}</label>
              <div
                className={`${style["input-wrapper"]} ${style["textarea-wrapper"]}`}
              >
                <FiAlignLeft className={style["input-icon"]} />
                <textarea rows="4" placeholder={t("products.productEditBox.productDesPlaceholder")} disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={style["modal__footer"]}>
          <button
            type="button"
            className={style["btn-cancel"]}
            onClick={closeModalUpdate}
          >
            {t("products.productEditBox.cancelBtn")}
          </button>
          <button type="button" className={style["btn-save"]}>
            <FiSave />
            <span>{t("products.productEditBox.saveBtn")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
