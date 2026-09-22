import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Store/Users";
import productsReducer from "./Store/Products";
import pricingRducer from "./Store/Pricing";
import todoReducer from "./Store/Todo";
import teamReducer from "./Store/Team";
import notifReducer from "./Store/Notifications";
import eventsReducer from "./Store/Events";
import authReducer from "./Store/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: usersReducer,
    products: productsReducer,
    pricing: pricingRducer,
    todos: todoReducer,
    team: teamReducer,
    notifications: notifReducer,
    events: eventsReducer,
  },
});

export default store;
