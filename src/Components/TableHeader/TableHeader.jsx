import React from 'react'
import style from "./TableHeader.module.css";

function TableHeader({ tds }) {

  console.log(tds);
  

  return (
    <>
      <div className={style["primary-table"]}>
        <div className={style["primary-thead"]}>
          <div className={style["primary-tr"]}>
            {

            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TableHeader