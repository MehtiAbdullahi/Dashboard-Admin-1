import style from "./TodoBox.module.css";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import classNames from "classnames";
import { PiTrash } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  changeDoTodo,
  changeFavorite,
  removeTodo,
} from "../../Redux/Store/Todo";

function TodoBox({ id, title, favorite, doTodo }) {
  // const [checkBox, setCheckBox] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const dispatch = useDispatch();

  const changeFavoriteTodo = (id) => {
    dispatch(changeFavorite(id));
    setIsFavorite(!isFavorite);
  };

  const changeDoTodoHandler = (id) => {
    dispatch(changeDoTodo(id));
  };

  const removeTodoHandler = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className={classNames(style["todo-box"], doTodo ? style["do"] : "")}>
      <div className={style["todo-title__wrapper"]}>
        <label className={style["check-box"]}>
          <input
            type="checkbox"
            defaultChecked={doTodo}
            onClick={() => changeDoTodoHandler(id)}
            // onClick={() => setCheckBox((prev) => !prev)}
          />
          <span className={style["check-mark"]}>
            <IoMdCheckmark />
          </span>
        </label>
        <span
          className={classNames(style["todo-title"], doTodo ? style["do"] : "")}
        >
          {title}
        </span>
      </div>
      <div className={style["todo-btns"]}>
        {doTodo ? (
          <div
            className={style["todo-icon__trash"]}
            onClick={() => removeTodoHandler(id)}
          >
            <PiTrash />
          </div>
        ) : (
          <>
            <span
              className={style["todo-icon__star"]}
              onClick={() => changeFavoriteTodo(id)}
            >
              {isFavorite ? (
                <FaStar className={style["todo-icon__star-solid"]} />
              ) : (
                <CiStar className={style["todo-icon__star-hollow"]} />
              )}
            </span>
            <span
              className={style["todo-icon__close"]}
              onClick={() => removeTodoHandler(id)}
            >
              <IoMdClose />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoBox;
