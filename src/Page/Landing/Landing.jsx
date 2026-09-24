import style from "./Landing.module.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

function Landing() {
  const [showSideBar, setShowSideBar] = useState(false);

  const closeSideBar = (e) => {
    setShowSideBar(!showSideBar);
  };

  return (
    <>
      <div className="" className={style["sidebar-landing__wrapper"]}>
        <div
          className={classNames(
            style["sidebar-wrapper"],
            showSideBar ? style["showSideBar"] : "",
          )}
        >
          <Sidebar setShowSideBar={setShowSideBar} />
        </div>
        <div className={style["landign-wrapper"]}>
          <Navbar setShowSideBar={setShowSideBar} />
          <div className={style["landing-body__wrapper"]}>
            <Outlet />
          </div>
        </div>
      </div>
      {showSideBar && (
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

export default Landing;
