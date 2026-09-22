import React from "react";
import style from "./Error.module.css";
import { TbFaceIdError } from "react-icons/tb";
import { useTranslation } from "react-i18next";

function Error({ titleKey }) {
  const { t } = useTranslation();

  return (
    <div className={style["error-wrapper"]}>
      <TbFaceIdError />
      <span>{t(`errors.${titleKey}`)}</span>
    </div>
  );
}

export default Error;
