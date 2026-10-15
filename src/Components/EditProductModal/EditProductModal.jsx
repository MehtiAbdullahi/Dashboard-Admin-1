//  p = product

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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { updateProduct } from "../../Redux/Store/Products";
import AlertError from "../AlertError/AlertError";
import { AnimatePresence } from "framer-motion";

function EditProductModal({ productId, closeModalUpdate }) {
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const { t } = useTranslation();
  const { products } = useSelector((state) => state.products);
  const currentProduct = products.find((p) => p.id === productId);
  const { id, title, price, image } = currentProduct;

  const [pTitle, setPTitle] = useState(title);
  const [pPrice, setPPrice] = useState(String(price));
  const [previewImage, setPreviewImage] = useState(image);

  const [hasError, setHasError] = useState({
    titleError: false,
    PriceError: false,
  });

  const saveChangsProduct = (id) => {
    const trimmedTitle = pTitle.trim();
    const parsedPrice = Number(pPrice);

    if (!trimmedTitle) {
      setHasError((prev) => ({
        ...prev,
        titleError: true,
      }));

      return;
    }

    if (
      pPrice.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setHasError((prev) => ({
        ...prev,
        PriceError: true,
      }));

      return;
    }

    dispatch(
      updateProduct({
        id,
        changes: {
          title: pTitle.trim(),
          price: Number(pPrice),
          image: previewImage,
        },
      }),
    );

    closeModalUpdate();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    event.target.value = "";
  };

  return (
    <>
      <div className={style["modal-overlay"]}>
        <AnimatePresence>
          {hasError.titleError && (
            <AlertError
              duration={3000}
              keyError="titleError"
              type="updateProductTitle"
              setHasError={setHasError}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {hasError.PriceError && (
            <AlertError
              duration={3000}
              keyError="PriceError"
              type="updateProductPrice"
              setHasError={setHasError}
            />
          )}
        </AnimatePresence>
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
                <img src={previewImage} alt="" />
              </div>
              <div className={style["image-actions"]}>
                <span className={style["image-actions__label"]}>
                  {t("products.productEditBox.imgTitle")}
                </span>
                <p className={style["image-actions__hint"]}>
                  {t("products.productEditBox.imgCaption")}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  id="product-image-input"
                  onChange={handleImageChange}
                  className={style["file-input"]}
                />
                <button
                  type="button"
                  className={style["upload-btn"]}
                  onClick={() => fileInputRef.current?.click()}
                >
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
                    className={hasError.titleError && style["error"]}
                    type="text"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder={t(
                      "products.productEditBox.productInputPlaceholder",
                    )}
                  />
                </div>
              </div>

              <div className={style["field-row"]}>
                <div className={style["field"]}>
                  <label>{t("products.productEditBox.productPrice")}</label>
                  <div className={style["input-wrapper"]}>
                    <FiDollarSign className={style["input-icon"]} />
                    <input
                      className={hasError.PriceError && style["error"]}
                      type="number"
                      value={pPrice}
                      onChange={(e) => setPPrice(e.target.value)}
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
                      <option>
                        {t("products.productEditBox.titleOption1")}
                      </option>
                      <option>
                        {t("products.productEditBox.titleOption2")}
                      </option>
                      <option>
                        {t("products.productEditBox.titleOption3")}
                      </option>
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
                  <textarea
                    rows="4"
                    placeholder={t(
                      "products.productEditBox.productDesPlaceholder",
                    )}
                    disabled
                  />
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
            <button
              type="button"
              className={style["btn-save"]}
              onClick={() => saveChangsProduct(id)}
            >
              <FiSave />
              <span>{t("products.productEditBox.saveBtn")}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProductModal;
