import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxActivityLog } from "react-icons/rx";
import { IoClose, IoLogOut } from "react-icons/io5";
import { MdManageAccounts, MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbExclamationMark } from "react-icons/tb";
import { HiOutlineBars3 } from "react-icons/hi2";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { logoutUser } from "../../Redux/Store/authSlice";
import { getUser } from "../../Redux/Store/Users";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

import style from "./Navbar.module.css";

function Navbar({ setShowSideBar }) {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const profileImageUrl = useSelector((state) => state.auth.profileImageUrl);

  const [loggedInUser, setLoggedInUser] = useState();
  const [isShow, setIsShow] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showLangMobile, setShowLangMobile] = useState(false);
  const [showNotifMobile, setShowNotifMobile] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const allUser = useSelector((state) => state.allUsers.users);

  const lanLocalStorage = JSON.parse(localStorage.getItem("lan"));

  const [languageSelected, setLanguageSelected] = useState(
    lanLocalStorage || "english",
  );

  const getInfoUser = async () => {
    await dispatch(getUser());
  };

  useEffect(() => {
    if (allUser?.length && user?.id) {
      const userFound = allUser.find((item) => item.id === user.id);
      setLoggedInUser(userFound);
    }
  }, [user, allUser]);

  useEffect(() => {
    getInfoUser();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(
      languageSelected === "persian"
        ? "fa"
        : languageSelected === "arabic"
          ? "ar"
          : "en",
    );

    localStorage.setItem("lan", JSON.stringify(languageSelected));
  }, [languageSelected]);

  useEffect(() => {
    document.body.classList.remove("light", "dark");

    document.body.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const hideLanguageItems = () => {
    setShowLanguage((prev) => !prev);
  };

  const logOutHandler = () => {
    dispatch(logoutUser());

    navigate("/login");
  };

  return (
    <>
      <div className={style.navbarWrapper}>
        {/* <div className={style.navbar}> */}
        <div className={style.navbarRight}>
          <div className={style.navbarRightProfile}>
            <img src={profileImageUrl || "icons/Icon-3.png"} alt="" />
            <div className={style.profileTexts}>
              <h5>
                {loggedInUser?.name
                  ? loggedInUser?.name
                  : t("navbar.defaultNmae")}
              </h5>

              <h6>{loggedInUser?.lastname ? loggedInUser?.lastname : ""}</h6>
            </div>
            <span
              className={style.profileRightIcon}
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {showProfile ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
              <ul
                className={`${style.profileRightSubmenu} ${
                  showProfile ? style.show : ""
                }`}
              >
                <li>
                  <MdManageAccounts
                    className={style["navbar-submenu__icon-manage"]}
                  />

                  <Link to="/manage-account">
                    {t("navbar.userSubmenu.manageAcc")}
                  </Link>
                </li>
                <li>
                  <RxActivityLog
                    className={style["navbar-submenu__icon-log"]}
                  />
                  <p>{t("navbar.userSubmenu.activityLog")}</p>
                </li>
                <li
                  onClick={() =>
                    setTheme((prev) => (prev === "light" ? "dark" : "light"))
                  }
                >
                  {theme === "light" ? (
                    <FaMoon className={style["navbar-submenu__icon-moon"]} />
                  ) : (
                    <MdSunny className={style["navbar-submenu__icon-sun"]} />
                  )}

                  <p>{t("navbar.userSubmenu.switchTheme")}</p>
                </li>
                <li onClick={logOutHandler}>
                  <IoLogOut className={style["navbar-submenu__icon-logout"]} />
                  <p>{t("navbar.userSubmenu.logOut")}</p>
                </li>
              </ul>
            </span>
          </div>

          <div className={style.navbarRightLanguage}>
            <img
              src={`${
                languageSelected === "english"
                  ? "image/flags/Flag-English.png"
                  : languageSelected === "arabic"
                    ? "image/flags/sa Saudi Arabia.png"
                    : languageSelected === "persian"
                      ? "image/flags/IR.png"
                      : ""
              }`}
              alt=""
            />
            <div className={style.languageSelected}>
              <span onClick={() => setShowLanguage((prev) => !prev)}>
                {t(`navbar.languages.${languageSelected}`)}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.08333 3.25838L0.995812 0.170854C0.768006 -0.0569515 0.39866 -0.0569515 0.170854 0.170854C-0.0569515 0.39866 -0.0569515 0.768006 0.170854 0.995812L3.67085 4.49581C3.89866 4.72362 4.26801 4.72362 4.49581 4.49581L7.99581 0.995812C8.22362 0.768006 8.22362 0.39866 7.99581 0.170854C7.76801 -0.0569515 7.39866 -0.0569515 7.17085 0.170854L4.08333 3.25838Z"
                  fill="#646464"
                />
              </svg>
              <ul
                className={`${style.languageItems} ${
                  showLanguage ? style.show : ""
                }`}
              >
                <h3 className={style.languageItemsTitle}>
                  {t("navbar.languagesSubmenuTitle")}
                </h3>
                <div
                  onClick={() => {
                    setLanguageSelected("english");

                    hideLanguageItems();
                  }}
                >
                  <span>
                    <img src="image/flags/Flag-English.png" alt="" />

                    <li>{t("navbar.languagesSubmenu.enlang")}</li>
                  </span>
                  {languageSelected === "english" ? <IoMdCheckmark /> : ""}
                </div>
                <div
                  onClick={() => {
                    setLanguageSelected("arabic");

                    hideLanguageItems();
                  }}
                >
                  <span>
                    <img src="image/flags/sa Saudi Arabia.png" alt="" />

                    <li>{t("navbar.languagesSubmenu.arlang")}</li>
                  </span>
                  {languageSelected === "arabic" ? <IoMdCheckmark /> : ""}
                </div>
                <div
                  onClick={() => {
                    setLanguageSelected("persian");

                    hideLanguageItems();
                  }}
                >
                  <span>
                    <img src="image/flags/IR.png" alt="" />

                    <li>{t("navbar.languagesSubmenu.falang")}</li>
                  </span>
                  {languageSelected === "persian" ? <IoMdCheckmark /> : ""}
                </div>
              </ul>
            </div>
          </div>
          <div className={style.navbarRightNotifactionWrapper}>
            <div
              className={style.notificationIcon}
              onClick={() => setIsShow((prev) => !prev)}
            >
              <svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 13.5C23.3284 13.5 24 14.1716 24 15V16.5C24 17.3284 23.3284 18 22.5 18H1.5C0.671573 18 2.41598e-08 17.3284 0 16.5V15C0 14.1716 0.671573 13.5 1.5 13.5H4.5L5.55566 4.00293C5.80895 1.72419 7.73459 0.000174713 10.0273 0H13.9727C16.2654 0.000174713 18.1911 1.72419 18.4443 4.00293L19.5 13.5H22.5Z"
                  fill="#4880FF"
                />
                <rect
                  opacity="0.3"
                  x="9"
                  y="19.5"
                  width="6"
                  height="6"
                  rx="2.25"
                  fill="#FF0000"
                />
              </svg>
              <span>{notifications.length}</span>
            </div>
            <div
              className={classNames(
                style["notificationBox"],
                isShow ? style["show"] : "",
              )}
            >
              <h3 className={style.notificationBoxTitle}>
                {t("notifications.title")}
              </h3>
              <ul className={style.notificationBoxLists}>
                {notifications.map(({ type }) => (
                  <li className={style.notificationBoxItem}>
                    <span>
                      <svg
                        width="5"
                        height="14"
                        viewBox="0 0 5 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.375 11.8125C4.375 13.043 3.39062 14 2.1875 14C0.957031 14 0 13.043 0 11.8125C0 10.6094 0.957031 9.625 2.1875 9.625C3.39062 9.625 4.375 10.6094 4.375 11.8125ZM0.246094 0.710938C0.21875 0.328125 0.519531 0 0.902344 0H3.44531C3.82812 0 4.12891 0.328125 4.10156 0.710938L3.74609 8.14844C3.71875 8.47656 3.41797 8.75 3.08984 8.75H1.25781C0.929688 8.75 0.628906 8.47656 0.601562 8.14844L0.246094 0.710938Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <div>
                      <h4>{t(`notifications.${type}.title`)}</h4>
                      <p>{t(`notifications.${type}.description`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className={style.notificationBoxText}>
                {t("notifications.textMore")}
              </p>
            </div>
          </div>
        </div>
        <div className={style.navbarProfileMobile}>
          <div
            className={style.navbarProfileImg}
            onClick={() => setShowSubmenu(!showSubmenu)}
          >
            <img
              src={
                profileImageUrl ||
                "image/Users/2a2e7f0f60b750dfb36c15c268d0118d.jpg"
              }
              alt=""
            />
          </div>
          <div
            className={classNames(
              style.navbarMobileSubmenu,
              showSubmenu ? style.show : "",
            )}
          >
            <IoClose
              className={style.navbarMobileSubmenuCloseIcon}
              onClick={() => setShowSubmenu(!showSubmenu)}
            />
            <div className="">
              <div
                className={style.navbarSubmenuProfileMobile}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className={style.submenuProfileMobileNameLast}>
                  <img src={profileImageUrl || "icons/Icon-3.png"} alt="" />
                  <div className={style.profileTexts}>
                    <h5>
                      {loggedInUser?.name
                        ? loggedInUser?.name
                        : t("navbar.defaultNmae")}
                    </h5>
                    <h6>
                      {loggedInUser?.lastname ? loggedInUser?.lastname : ""}
                    </h6>
                  </div>
                </div>
                <FaChevronDown />
              </div>
              <ul
                className={`${style.profileSubmenuMobile} ${
                  showProfileMenu ? style.show : ""
                }`}
              >
                <li>
                  <MdManageAccounts
                    className={style["navbar-submenu__icon-manage"]}
                  />

                  <Link to="/manage-account">
                    {t("navbar.userSubmenu.manageAcc")}
                  </Link>
                </li>
                <li>
                  <RxActivityLog
                    className={style["navbar-submenu__icon-log"]}
                  />
                  <p>{t("navbar.userSubmenu.activityLog")}</p>
                </li>
                <li
                  onClick={() =>
                    setTheme((prev) => (prev === "light" ? "dark" : "light"))
                  }
                >
                  {theme === "light" ? (
                    <FaMoon className={style["navbar-submenu__icon-moon"]} />
                  ) : (
                    <MdSunny className={style["navbar-submenu__icon-sun"]} />
                  )}

                  <p>{t("navbar.userSubmenu.switchTheme")}</p>
                </li>
                <li onClick={logOutHandler}>
                  <IoLogOut className={style["navbar-submenu__icon-logout"]} />
                  <p>{t("navbar.userSubmenu.logOut")}</p>
                </li>
              </ul>
            </div>

            <div className={style.navbarLanguageMobileWrapper}>
              <div
                className={style.navbarLanguageMobile}
                onClick={() => setShowLangMobile(!showLangMobile)}
              >
                <div className={style.navbarLanguageIconName}>
                  <img
                    src={`${
                      languageSelected === "english"
                        ? "/public/image/flags/Flag-English.png"
                        : languageSelected === "arabic"
                          ? "/public/image/flags/sa Saudi Arabia.png"
                          : languageSelected === "persian"
                            ? "/public/image/flags/IR.png"
                            : ""
                    }`}
                    alt=""
                  />
                  <span onClick={() => setShowLanguage((prev) => !prev)}>
                    {t(`navbar.languages.${languageSelected}`)}
                  </span>
                </div>
                <FaChevronDown
                  className={classNames(
                    style.langMobileIconChevron,
                    showLangMobile ? style.show : "",
                  )}
                />
              </div>
              <ul
                className={`${style.languageItemsMobile} ${
                  showLangMobile ? style.show : ""
                }`}
              >
                <li
                  className={languageSelected === "english" && style.selected}
                  onClick={() => {
                    setLanguageSelected("english");

                    hideLanguageItems();
                  }}
                >
                  <div className="">
                    <img src="image/flags/Flag-English.png" alt="" />
                    <span>{t("navbar.languagesSubmenu.enlang")}</span>
                  </div>
                  {languageSelected === "english" && <FaCheck />}
                </li>
                <li
                  className={languageSelected === "arabic" && style.selected}
                  onClick={() => {
                    setLanguageSelected("arabic");

                    hideLanguageItems();
                  }}
                >
                  <div className="">
                    <img src="image/flags/sa Saudi Arabia.png" alt="" />
                    <span>{t("navbar.languagesSubmenu.arlang")}</span>
                  </div>
                  {languageSelected === "arabic" && <FaCheck />}
                </li>
                <li
                  className={languageSelected === "persian" && style.selected}
                  onClick={() => {
                    setLanguageSelected("persian");

                    hideLanguageItems();
                  }}
                >
                  <div className="">
                    <img
                      src={`${import.meta.env.BASE_URL}image/flags/IR.png`}
                      alt=""
                    />
                    <span>{t("navbar.languagesSubmenu.falang")}</span>
                  </div>
                  {languageSelected === "persian" && <FaCheck />}
                </li>
              </ul>
            </div>

            <div className={style.navbarNotifactionsMobile}>
              <div
                className={style.notificationIconMobile}
                onClick={() => setShowNotifMobile(!showNotifMobile)}
              >
                <div>
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 13.5C23.3284 13.5 24 14.1716 24 15V16.5C24 17.3284 23.3284 18 22.5 18H1.5C0.671573 18 2.41598e-08 17.3284 0 16.5V15C0 14.1716 0.671573 13.5 1.5 13.5H4.5L5.55566 4.00293C5.80895 1.72419 7.73459 0.000174713 10.0273 0H13.9727C16.2654 0.000174713 18.1911 1.72419 18.4443 4.00293L19.5 13.5H22.5Z"
                      fill="#4880FF"
                    />
                    <rect
                      opacity="0.3"
                      x="9"
                      y="19.5"
                      width="6"
                      height="6"
                      rx="2.25"
                      fill="#FF0000"
                    />
                  </svg>
                  <p>{t("notifications.title")}</p>
                </div>
                <div className="">
                  <span>{notifications.length}</span>
                  <FaChevronDown />
                </div>
              </div>
              <div
                className={classNames(
                  style["notificationBoxMobile"],
                  showNotifMobile ? style["show"] : "",
                )}
              >
                <ul className={style.notificationBoxListsMobile}>
                  {notifications.map(({ type }) => (
                    <li className={style.notificationBoxItemMobile}>
                      <span>
                        <svg
                          width="5"
                          height="14"
                          viewBox="0 0 5 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.375 11.8125C4.375 13.043 3.39062 14 2.1875 14C0.957031 14 0 13.043 0 11.8125C0 10.6094 0.957031 9.625 2.1875 9.625C3.39062 9.625 4.375 10.6094 4.375 11.8125ZM0.246094 0.710938C0.21875 0.328125 0.519531 0 0.902344 0H3.44531C3.82812 0 4.12891 0.328125 4.10156 0.710938L3.74609 8.14844C3.71875 8.47656 3.41797 8.75 3.08984 8.75H1.25781C0.929688 8.75 0.628906 8.47656 0.601562 8.14844L0.246094 0.710938Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <div>
                        <h4>{t(`notifications.${type}.title`)}</h4>
                        <p>{t(`notifications.${type}.description`)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className={style.notificationBoxTextMobile}>
                  {t("notifications.textMore")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.navbarLeft}>
          <div className={style.navbarLeftSearchInput}>
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
            <input type="text" placeholder={t("navbar.inputPlaceHolder")} />
          </div>
        </div>
        {/* </div> */}
        <HiOutlineBars3
          onClick={() => setShowSideBar((prev) => !prev)}
          className={style.iconSideBar}
        />
      </div>
      {showSubmenu && (
        <div
          className={classNames(
            style["background"],
            // showSideBar ? style["show"] : "",
          )}
        ></div>
      )}
    </>
  );
}

export default Navbar;
