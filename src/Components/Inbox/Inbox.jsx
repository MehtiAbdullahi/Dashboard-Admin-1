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

function Inbox() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("inbox.title")}</h1>

      <div className={style["inbox-wrapper"]}>
        <div className={style["inbox-left"]}>
          <Link className={style["inbox-left__btn"]}>
            <span>+ {t("inbox.conpose")}</span>
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

            <span className={style["create-label"]}>
              + {t("inbox.lables.createNewLable")}
            </span>
          </div>
        </div>

        <div className={style["inbox-right"]}>
          <div className={style["inbox-right__top"]}>
            <div className={style["inbox-right__left"]}>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.1441 11.9863C11.8739 10.8261 13.1464 7.67265 11.9863 4.94282C10.8261 2.21298 7.67265 0.940497 4.94281 2.10065C2.21297 3.2608 0.94049 6.41426 2.10064 9.1441C3.2608 11.8739 6.41426 13.1464 9.1441 11.9863Z"
                      stroke="black"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8408 10.8407L15.0061 15.0066"
                      stroke="black"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>

              <input type="text" placeholder={t("inbox.placeholder")} />
            </div>

            <div className={style["inbox-right__right"]}>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2222 0H1.76889C0.786667 0 0.00888889 0.795556 0.00888889 1.77778L0 14.2222C0 15.2044 0.786667 16 1.76889 16H14.2222C15.2044 16 16 15.2044 16 14.2222V1.77778C16 0.795556 15.2044 0 14.2222 0ZM14.2222 10.6667H10.6667C10.6667 12.1378 9.47111 13.3333 8 13.3333C6.52889 13.3333 5.33333 12.1378 5.33333 10.6667H1.76889V1.77778H14.2222V10.6667ZM9.77778 6.22222H11.5556L8 9.77778L4.44444 6.22222H6.22222V3.55556H9.77778V6.22222Z"
                    fill="#202224"
                  />
                </svg>
              </span>

              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM7.2 12V7.2H8.8V12H7.2ZM7.2 4V5.6H8.8V4H7.2Z"
                    fill="#202224"
                  />
                </svg>
              </span>

              <span>
                <svg
                  width="13"
                  height="16"
                  viewBox="0 0 13 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.33333 0.888889H12.4444V2.66667H0V0.888889H3.11111L4 0H8.44444L9.33333 0.888889ZM2.66667 16C1.68889 16 0.888889 15.2 0.888889 14.2222V3.55556H11.5556V14.2222C11.5556 15.2 10.7556 16 9.77778 16H2.66667Z"
                    fill="black"
                  />
                </svg>
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
