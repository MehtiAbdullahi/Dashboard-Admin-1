import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import style from "./Rating.module.css";

function Rating({ rate }) {
  const fullStars = Math.floor(rate);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <TiStarFullOutline
          key={`full-${index}`}
          className={style["full-star"]}
        />
      ))}

      {Array.from({ length: emptyStars }, (_, index) => (
        <CiStar key={`empty-${index}`} className={style["star"]} />
      ))}
    </>
  );
}

export default Rating;
