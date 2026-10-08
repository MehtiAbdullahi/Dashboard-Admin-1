import { Link } from "react-router-dom";
import style from "./UsersList.module.css";
import Input from "../Input/Input";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

// ? Icons

import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../Redux/Store/Users";
import Loader from "../Loader/Loader";
import User from "../User/User";

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

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [hiddenUsers, setHiddenUsers] = useState([]);

  const { users, loading, error } = useSelector((state) => state.allUsers);

  const addFilterToState = (data) => {
    setSelectedFilter(data);
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    console.log(hiddenUsers);
  }, [hiddenUsers]);

  const filteredUsers = users.filter((user) => {
    if (hiddenUsers.includes(user.id)) {
      return false;
    }

    if (selectedFilter === "All") {
      return true;
    }

    if (selectedFilter === "Just admin") {
      return user.role === "admin";
    }

    if (selectedFilter === "Just user") {
      return user.role === "user";
    }
  });

  const deleteUserHandler = (id) => {
    setHiddenUsers((prev) => [...prev, id]);
  };

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
              {selectedFilter}
              <ul>
                <li onClick={() => addFilterToState("All")}>All</li>
                <li onClick={() => addFilterToState("Just admin")}>
                  Just Admins
                </li>
                <li onClick={() => addFilterToState("Just user")}>Just User</li>
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
            {loading && <Loader />}
            {!loading &&
              !error &&
              filteredUsers?.map((u) => (
                <User key={u.id} {...u} deleteUser={deleteUserHandler} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
