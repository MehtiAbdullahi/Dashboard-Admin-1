import classNames from "classnames";
import style from "./User.module.css";
import { useDispatch } from "react-redux";

import { MdDeleteOutline } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import UserUpdateModal from "../UserUpdateModal/UserUpdateModal";
import { updateUser } from "../../Redux/Store/Users";

const User = ({
  id,
  name,
  username,
  lastname,
  role,
  email,
  profile_img,
  deleteUser,
}) => {
  const dispatch = useDispatch();
    
  const [isEditOpen, setIsEditOpen] = useState(false);

  const updateRoleHandler = (id, role) => {
    dispatch(updateUser({ id, role }));
  };

  return (
    <>
      <div className={classNames(style["user-item"], style["tr"])}>
        <div className={classNames(style["td"])}>
          <img
            className={style["user-item__img"]}
            src={`${profile_img ? profile_img : `${import.meta.env.BASE_URL}image/Users/2a2e7f0f60b750dfb36c15c268d0118d.jpg`}`}
            alt=""
          />
        </div>
        <span className={classNames(style["td"])}>{username}</span>
        <span className={classNames(style["td"])}>{name ? name : "..."}</span>
        <span className={classNames(style["td"])}>
          {lastname ? lastname : "..."}
        </span>
        <span className={classNames(style["td"])}>{email ? email : "..."}</span>
        <div className={style["td"]}>
          <span
            className={style[`${role === "user" ? "is-user" : "is-admin"}`]}
          >
            {role}
          </span>
        </div>
        <div className={classNames(style["td"], style["user-item__actuibs"])}>
          <span
            className={style["user-item__icon-edit"]}
            onClick={() => setIsEditOpen(true)}
          >
            <MdEdit />
          </span>
          <span
            className={style["user-item__icon-delete"]}
            onClick={() => deleteUser(id)}
          >
            <MdDeleteOutline />
          </span>
        </div>
        {isEditOpen && (
          <UserUpdateModal
            user={{ id, username, email, role, profile_img }}
            onClose={() => setIsEditOpen(false)}
            onSave={updateRoleHandler}
          />
        )}
      </div>
    </>
  );
};

export default User;
