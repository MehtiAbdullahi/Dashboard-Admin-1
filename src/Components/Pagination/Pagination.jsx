import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classNames from "classnames";
import style from "./Pagination.module.css";
import getVisiblePages from "../../utils/getVisiblePages";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) {
  const { t } = useTranslation();

  const pages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={style["pagination"]}
      aria-label={t("pagination.label", "Pagination")}
    >
      <button
        type="button"
        className={classNames(
          style["pagination__btn"],
          style["pagination__btn--nav"],
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack className={style["pagination__icon"]} aria-hidden />
        <span className={style["pagination__label"]}>
          {t("pagination.previous", "Previous")}
        </span>
      </button>

      <div className={style["pagination__pages"]}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={style["pagination__btn"]}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={t("pagination.goToPage", {
              page,
              defaultValue: "Go to page {{page}}",
            })}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={classNames(
          style["pagination__btn"],
          style["pagination__btn--nav"],
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className={style["pagination__label"]}>
          {t("pagination.next", "Next")}
        </span>
        <IoIosArrowForward className={style["pagination__icon"]} aria-hidden />
      </button>
    </nav>
  );
}

export default Pagination;
