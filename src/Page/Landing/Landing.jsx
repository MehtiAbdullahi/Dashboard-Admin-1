import style from "./Landing.module.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Landing() {

  return (
    <>
      <div className="" className={style["sidebar-landing__wrapper"]}>
        <div className={style["sidebar-wrapper"]}>
          <Sidebar />
        </div>
        <div className={style["landign-wrapper"]}>
          <Navbar />
          <div className={style["landing-body__wrapper"]}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
