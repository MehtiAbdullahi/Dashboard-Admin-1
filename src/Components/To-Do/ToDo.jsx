import { Link } from "react-router-dom";
import style from "./ToDo.module.css";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import classNames from "classnames";
import Input from "../Input/Input";
import { createTodo } from "../../Redux/Store/Todo";
import { useDispatch, useSelector } from "react-redux";
import TodoBox from "../TodoBox/TodoBox";
import Error from "../ErrorComponent/Error";
import { useTranslation } from "react-i18next";
import AlertError from "../AlertError/AlertError";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function ToDo() {
  const { t } = useTranslation();

  const [showInputSearch, setShowInputSearch] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => {
        setHasError(false);
      }, 5000);

      return () => clearTimeout(timer); // پاکسازی مهمه!
    }
  }, [hasError]);

  const changeStatusShow = () => {
    setShowInputSearch((prev) => !prev);
  };

  const createNewTodo = () => {
    if (inputValue.length === 0) {
      setHasError(true);
    } else {
      setHasError(false);

      const newTodo = {
        id: crypto.randomUUID(),
        title: inputValue,
        favorite: false,
        doTodo: false,
      };

      dispatch(createTodo(newTodo));
      setInputValue("");
    }
  };

  return (
    <>
      <AnimatePresence>
        {hasError && <AlertError type={`todo`} setHasError={setHasError} />}
      </AnimatePresence>
      <div className={style["todo-header"]}>
        <h1>{t("todo.title")}</h1>
        <div className={style["todo-header__create-btn"]}>
          <div
            className={classNames(
              style["todo-header__input"],
              showInputSearch ? style["show"] : "",
            )}
          >
            <Input
              type={"text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={createNewTodo}>{t("todo.btnCreate")}</button>
          </div>
          <Link onClick={changeStatusShow}>
            <span>
              {showInputSearch ? <FaArrowLeft /> : <IoIosMenu />}
              {t("todo.btn")}
            </span>
          </Link>
        </div>
      </div>
      <div className={style["todo-body__wrapper"]}>
        {todos?.length ? (
          todos.map((data) => <TodoBox {...data} />)
        ) : (
          <Error titleKey={`noTodos`} />
        )}
      </div>
    </>
  );
}

export default ToDo;
