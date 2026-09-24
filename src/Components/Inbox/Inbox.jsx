import { Link, NavLink } from "react-router-dom";
import MailMessage from "../MailMessage/MailMessage";
import style from "./Inbox.module.css";

import { MdOutlineNotificationImportant, MdOutlineEmail } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { LuPencil, LuSend } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { TbArrowBadgeRight } from "react-icons/tb";
import classNames from "classnames";

function Inbox() {
  const [showTools, setShowTools] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <h1>{t("inbox.title")}</h1>

      <div className={style["inbox-wrapper"]}>
        <div
          className={classNames(
            style["btn__open-tools"],
            showTools && style["show"],
          )}
          onClick={() => setShowTools(!showTools)}
        >
          <span>
            <TbArrowBadgeRight />
          </span>
        </div>
        <div
          className={classNames(
            style["inbox-left"],
            showTools && style["show"],
          )}
        >
          <Link className={style["inbox-left__btn"]}>
            <div
              className={classNames(
                style["btn__close-tools"],
                showTools && style["show"],
              )}
              onClick={() => setShowTools(!showTools)}
            >
              <span>
                <TbArrowBadgeRight />
              </span>
            </div>
            <div>
              <span>+</span>
              <span>{t("inbox.conpose")}</span>
            </div>
          </Link>
          <div className={style["inbox-left__body"]}>
            <div className={style["my-email__wrapper"]}>
              <h2>{t("inbox.title")}</h2>

              <NavLink
                to="/Inbox"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <MdOutlineEmail />
                    <span>{t("inbox.myEmail.inbox")}</span>
                  </div>

                  <span>1253</span>
                </div>
              </NavLink>

              <NavLink
                to="/Starred"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <CiStar />
                    <span>{t("inbox.myEmail.starred")}</span>
                  </div>

                  <span>245</span>
                </div>
              </NavLink>

              <NavLink
                to="/Sent"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <LuSend />
                    <span>{t("inbox.myEmail.Sent")}</span>
                  </div>

                  <span>24,532</span>
                </div>
              </NavLink>

              <NavLink
                to="/Draft"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <LuPencil />
                    <span>{t("inbox.myEmail.Draft")}</span>
                  </div>

                  <span>09</span>
                </div>
              </NavLink>

              <NavLink
                to="/Spam"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <FiAlertTriangle />
                    <span>{t("inbox.myEmail.Spam")}</span>
                  </div>

                  <span>14</span>
                </div>
              </NavLink>

              <NavLink
                to="/Important"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <MdOutlineNotificationImportant />
                    <span>{t("inbox.myEmail.Important")}</span>
                  </div>

                  <span>18</span>
                </div>
              </NavLink>

              <NavLink
                to="/Bin"
                className={({ isActive }) => (isActive ? style.selected : "")}
              >
                <div className={style["my-email__inbox"]}>
                  <div className={style["inbox__title-icon"]}>
                    <FaRegTrashAlt />
                    <span>{t("inbox.myEmail.Bin")}</span>
                  </div>

                  <span>9</span>
                </div>
              </NavLink>
            </div>

            <div className={style["label-wrapper"]}>
              <h2>{t("inbox.lables.title")}</h2>

              <label className={`${style.label} ${style.primary}`}>
                <input type="checkbox" />
                <span className={style.checkmark}>
                  <IoCheckmark />
                </span>
                {t("inbox.lables.primary")}
              </label>

              <label className={`${style.label} ${style.social}`}>
                <input type="checkbox" />
                <span className={style.checkmark}>
                  <IoCheckmark />
                </span>
                {t("inbox.lables.social")}
              </label>

              <label className={`${style.label} ${style.work}`}>
                <input type="checkbox" />
                <span className={style.checkmark}>
                  <IoCheckmark />
                </span>
                {t("inbox.lables.work")}
              </label>

              <label className={`${style.label} ${style.friends}`}>
                <input type="checkbox" />
                <span className={style.checkmark}>
                  <IoCheckmark />
                </span>
                {t("inbox.lables.friends")}
              </label>
            </div>

            <div className={style["create-label"]}>
              <span>+</span>
              <span>{t("inbox.lables.createNewLable")}</span>
            </div>
          </div>
        </div>

        <div className={style["inbox-right"]}>
          <div className={style["inbox-right__top"]}>
            <div className={style["inbox-right__left"]}>
              <span>
                <IoIosSearch />
              </span>

              <input type="text" placeholder={t("inbox.placeholder")} />
            </div>

            <div className={style["inbox-right__right"]}>
              <span>
                <MdOutlineMoveToInbox />
              </span>

              <span>
                <AiFillInfoCircle />
              </span>

              <span>
                <FaTrash />
              </span>
            </div>
          </div>

          <div className={style["mail-boxs"]}>
            <MailMessage label={"Primary"} />
            <MailMessage label={"Work"} />
            <MailMessage label={"Primary"} />
            <MailMessage label={"Work"} />
            <MailMessage label={"Work"} />
            <MailMessage label={"Primary"} />
            <MailMessage label={"Friends"} />
            <MailMessage label={"Social"} />
            <MailMessage label={"Friends"} />
            <MailMessage label={"Social"} />
            <MailMessage label={"Friends"} />
            <MailMessage label={"Social"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
