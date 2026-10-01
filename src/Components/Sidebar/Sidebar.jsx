import { NavLink } from "react-router-dom";

import style from "./Sidebar.module.css";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

// Todo Icons
import { IoClose } from "react-icons/io5";

function Sidebar({ setShowSideBar }) {
  const { t } = useTranslation();

  const sidebarItems = {
    mainItem: [
      { name: "sidebar.dashboard", path: "/dashboard" },
      { name: "sidebar.products", path: "/products" },
      { name: "sidebar.usersList", path: "/users-list" },
      { name: "sidebar.favorites", path: "/favorites" },
      { name: "sidebar.inbox", path: "/inbox" },
      { name: "sidebar.orderLists", path: "/orderlists" },
      { name: "sidebar.productStock", path: "/productstock" },
    ],

    pages: [
      { name: "sidebar.pricing", path: "/pricing" },
      { name: "sidebar.calendar", path: "/calender" },
      { name: "sidebar.todo", path: "/todo" },
      { name: "sidebar.contact", path: "/contact" },
      { name: "sidebar.invoice", path: "/invoice" },
      { name: "sidebar.uiElements", path: "/uIelements" },
      { name: "sidebar.team", path: "/team" },
      { name: "sidebar.table", path: "/table" },
    ],

    otherItems: [
      {
        name: "sidebar.account",
        path: "/manage-account",
        className: "navLinkSidebarAccount",
      },
    ],
  };

  const getNavLinkClass =
    (extraClass) =>
    ({ isActive }) =>
      classNames(style.navLink, extraClass, {
        [style.selected]: isActive,
      });

  return (
    <>
      <div className={style.sidebarWrapper}>
        <div className={style.sidebar}>
          <span className={style["dasboard-admin__title"]}>
            <IoClose
              className={style["dasboard-admin__title-icon"]}
              onClick={() => setShowSideBar((prev) => !prev)}
            />
            <div className="">
              <span>Dasboard</span> Admin
            </div>
          </span>

          <div className={style.sidebarTop}>
            <ul className={style.sidebarItems}>
              {sidebarItems.mainItem.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={getNavLinkClass(style.navLinkSidebar)}
                >
                  <span></span>
                  <li>{t(name)}</li>
                  <h4></h4>
                </NavLink>
              ))}
            </ul>
          </div>

          <div className={style.sidebarBody}>
            <h3>{t("sidebar.pages")}</h3>

            <ul className={style.sidebarItems}>
              {sidebarItems.pages.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={getNavLinkClass(style.navLinkSidebar)}
                >
                  <span></span>
                  <li>{t(name)}</li>
                  <h4></h4>
                </NavLink>
              ))}
            </ul>
          </div>

          <div className={style.sidebarBottom}>
            <ul className={style.sidebarItems}>
              {sidebarItems.otherItems.map(({ name, path, className }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={getNavLinkClass(style.navLinkSidebar)}
                >
                  <span></span>
                  <li>{t(name)}</li>
                  <h4></h4>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
