import style from "./TeamBox.module.css";

function TeamBox({ name, Role, email, img }) {
  return (
    <div className={style["team-box"]}>
      <div className={style["img-info__wrapper"]}>
        <div className={style["img-info"]}>
          <img src={img} alt="" />
          <span className={style["info-name"]}>{name}</span>
          <span className={style["info-role"]}>{Role}</span>
          <span className={style["info-email"]}>{email}</span>
        </div>
      </div>
    </div>
  );
}

export default TeamBox;
