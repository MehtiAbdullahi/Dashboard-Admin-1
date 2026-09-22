import { Link } from "react-router-dom";
import style from "./Team.module.css";
import TeamBox from "../TeamBox/TeamBox";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Team() {
  const { t } = useTranslation();
  const team = useSelector((state) => state.team);

  return (
    <>
      <div className={style["team-header"]}>
        <h1>{t("team.title")}</h1>
        <Link>
          <span>{t('team.btn')}</span>
        </Link>
      </div>
      <div className={style["team-box__wrapper"]}>
        {team.map((data) => (
          <TeamBox {...data} />
        ))}
      </div>
    </>
  );
}

export default Team;
