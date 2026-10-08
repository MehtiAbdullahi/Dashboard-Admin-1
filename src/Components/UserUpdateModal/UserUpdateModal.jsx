import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { MdClose, MdEmail, MdPerson } from "react-icons/md";
import style from "./UserUpdateModal.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ROLES = [
  { value: "user", label: "usersList.updateUser.roleUser" },
  { value: "admin", label: "usersList.updateUser.roleAdmin" },
];

export default function UserUpdateModal({ user, onClose, onSave }) {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  const avatar =
    user.profile_img ||
    `${import.meta.env.BASE_URL}image/Users/2a2e7f0f60b750dfb36c15c268d0118d.jpg`;

  // بستن با Esc + جلوگیری از اسکرول صفحه پشت مودال
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const saveHandler = async () => {
    setLoading(true);
    try {
      await onSave(user.id, role);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className={style["overlay"]} onClick={onClose}>
      <div
        className={style["modal"]}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={style["close"]} onClick={onClose} aria-label="بستن">
          <MdClose />
        </button>

        <div className={style["header"]}>
          <img className={style["avatar"]} src={avatar} alt="" />
          <div className={style["header__text"]}>
            <h3 className={style["title"]}>
              {t("usersList.updateUser.title")}
            </h3>
            <span
              className={classNames(
                style["badge"],
                style[user.role === "admin" ? "badge--admin" : "badge--user"],
              )}
            >
              {user.role}
            </span>
          </div>
        </div>

        <div className={style["info"]}>
          <div className={style["info__row"]}>
            <span className={style["info__icon"]}>
              <MdPerson />
            </span>
            <div className={style["info__content"]}>
              <span className={style["info__label"]}>
                {t("usersList.updateUser.titleName")}
              </span>
              <span className={style["info__value"]}>{user.username}</span>
            </div>
          </div>
          <div className={style["info__row"]}>
            <span className={style["info__icon"]}>
              <MdEmail />
            </span>
            <div className={style["info__content"]}>
              <span className={style["info__label"]}>
                {t("usersList.updateUser.titleEmail")}
              </span>
              <span className={style["info__value"]}>
                {user.email || "..."}
              </span>
            </div>
          </div>
        </div>

        <p className={style["section-title"]}>
          {t("usersList.updateUser.userRole")}
        </p>
        <div className={style["roles"]}>
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={classNames(style["roles__btn"], {
                [style["roles__btn--active"]]: role === r.value,
                [style["roles__btn--admin"]]:
                  role === r.value && r.value === "admin",
              })}
            >
              {t(r.label)}
            </button>
          ))}
        </div>

        <div className={style["footer"]}>
          <button className={style["btn-cancel"]} onClick={onClose}>
            {t("usersList.updateUser.cancel")}
          </button>
          <button
            className={style["btn-save"]}
            onClick={saveHandler}
            disabled={
              loading || role === user.role || currentUser.id === user.id
            }
          >
            {t(
              loading
                ? "usersList.updateUser.loading"
                : "usersList.updateUser.save",
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
