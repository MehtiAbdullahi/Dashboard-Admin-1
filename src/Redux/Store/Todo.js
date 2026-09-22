import { createSlice } from "@reduxjs/toolkit";

const sevedTodos = JSON.parse(localStorage.getItem("todos")) || [];

const todoReducer = createSlice({
  name: "todo",
  initialState: sevedTodos,
  reducers: {
    createTodo(state, action) {
      state.push(action.payload);
    },
    removeTodo(state, action) {
      const todoId = action.payload;
      const noRemovedTodo = state.filter((todo) => todo.id !== todoId);
      return noRemovedTodo;
    },
    changeFavorite(state, action) {
      const todoId = action.payload;
      const findTodo = state.findIndex((todo) => todo.id === todoId);
      if (findTodo !== -1) {
        state[findTodo].favorite = !state[findTodo].favorite;
      }
    },
    changeDoTodo(state, action) {
      const todoId = action.payload;
      const findTodo = state.findIndex((todo) => todo.id === todoId);
      if (findTodo !== -1) {
        state[findTodo].doTodo = !state[findTodo].doTodo;
      }
    },
  },
});

export default todoReducer.reducer;
export const { createTodo, removeTodo, changeFavorite, changeDoTodo } =
  todoReducer.actions;
