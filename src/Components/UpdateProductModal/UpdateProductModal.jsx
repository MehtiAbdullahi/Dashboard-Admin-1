import Input from "../Input/Input";
import style from "./UpdateProductModal.module.css";

function UpdateProductModal({
  changeStatusShowModal,
  updateProductHandler,
  setInputTitle,
  setInputPrice,
  setInputDescription,
  setInputCategory,
}) {
  return (
    <>
      <div className={style["update-modal__wrapper"]}>
        <div className={style["update-modal"]}>
          <h2 className={style["update-modal__title"]}>Update Product</h2>
          <form action="">
            <Input
              label={"title:"}
              type={"text"}
              id={"title"}
              onClic={(e) => setInputTitle(e.target.value)}
            />
            <Input
              label={"price:"}
              type={"text"}
              id={"price"}
              onClic={(e) => setInputPrice(e.target.value)}
            />
            <Input
              label={"description:"}
              type={"text"}
              id={"description"}
              onClic={(e) => setInputDescription(e.target.value)}
            />
            <Input
              label={"category:"}
              type={"text"}
              id={"category"}
              onClic={(e) => setInputCategory(e.target.value)}
            />
            <div className={style["update-modal__btns"]}>
              <button
                onClick={updateProductHandler}
                className={style["update-modal__btn-save"]}
                type="submit"
              >
                Save
              </button>
              <button
                onClick={changeStatusShowModal}
                className={style["update-modal__btn-cancel"]}
                type="submit"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProductModal;
