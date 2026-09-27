import { Link } from "react-router-dom";
import style from "./UsersList.module.css";
import Input from "../Input/Input";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

// ? Icons

import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/Store/Users";

function UsersList() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const tableItems = {
    th: [
      { title: t("usersList.profile") },
      { title: t("usersList.username") },
      { title: t("usersList.name") },
      { title: t("usersList.lastName") },
      { title: t("usersList.email") },
      { title: t("usersList.rule") },
      { title: t("usersList.actions") },
    ],
  };

  const [selectedFilter, setSelectedFilter] = useState("all");
  // const [inputValue, setInputValue] = useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const addFilterToState = (data) => {
    setSelectedFilter(data);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // const filteredUsers = users.filter((user) => {
  //   if (selectedFilter === "all") {
  //     return true;
  //   }

  //   if (selectedFilter === "just-admin") {
  //     return user.rule === "admin";
  //   }

  //   if (selectedFilter === "just-user") {
  //     return user.rule === "user";
  //   }
  // });

  // const searchHandler = (e) => {
  //   setInputValue(e.target.value);
  //   filteredUsers();
  // };

  return (
    <>
      <div className={style["user-list__header"]}>
        <h1>{t("usersList.title")}</h1>
      </div>
      <div className={style["users-wrapper"]}>
        <div className={style["users-top"]}>
          {/* <div className={style["users-top__search-input"]}>
            <div className="">
              <CiSearch />
              <Input
                type={"text"}
                placeholder={"Search"}
                value={inputValue}
                onChange={(e) => searchHandler(e)}
              />
            </div>
          </div> */}
          <div className={style["users-top__filter-wrapper"]}>
            <span>
              {selectedFilter === "all"
                ? "All"
                : selectedFilter === "just-admin"
                  ? "Just Admin"
                  : "Just User"}
              <ul>
                <li onClick={() => addFilterToState("all")}>All</li>
                <li onClick={() => addFilterToState("just-admin")}>
                  Just Admins
                </li>
                <li onClick={() => addFilterToState("just-user")}>Just User</li>
              </ul>
              <FaAngleDown />
            </span>
          </div>
        </div>
        <div className={classNames(style["users-body"], style["table"])}>
          <div className={classNames(style["thead"])}>
            <div className={classNames(style["tr"])}>
              {tableItems.th.map((item) => (
                <span className={classNames(style["th"])}>{item.title}</span>
              ))}
            </div>
          </div>
          <div
            className={classNames(
              style["users-body__items-wrapper"],
              style["tbody"],
            )}
          >
            <div className={classNames(style["user-item"], style["tr"])}>
              <div className={classNames(style["td"])}>
                <img
                  className={style["user-item__img"]}
                  src="image/Users/Untitled-3.png"
                  alt=""
                />
              </div>
              <span className={classNames(style["td"])}>username</span>
              <span className={classNames(style["td"])}>name</span>
              <span className={classNames(style["td"])}>lastname</span>
              <span className={classNames(style["td"])}>email</span>
              <div className={style["td"]}>
                <span
                // className={
                //   style[`${rule === "user" ? "is-user" : "is-admin"}`]
                // }
                >
                  rule
                </span>
              </div>
              <div
                className={classNames(style["td"], style["user-item__actuibs"])}
              >
                <span className={style["user-item__icon-info"]}>
                  <FaInfo />
                </span>
                <span className={style["user-item__icon-edit"]}>
                  <MdEdit />
                </span>
                <span className={style["user-item__icon-delete"]}>
                  <MdDeleteOutline />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
