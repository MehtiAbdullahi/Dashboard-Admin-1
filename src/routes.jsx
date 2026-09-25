import { Children } from "react";
import Landing from "./Page/Landing/Landing";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginPage from "./Page/LoginPage/LoginPage";
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import StatusPage from "./Page/StatusPage/StatusPage";

import Products from "./Components/Products/Products.jsx";
import Favorites from "./Components/Favorites/Favorites.jsx";
import Inbox from "./Components/Inbox/Inbox.jsx";
import Orderlists from "./Components/Orderlists/Orderlists.jsx";
import Productstock from "./Components/Productstock/Productstock.jsx";
import Pricing from "./Components/Pricing/Pricing.jsx";
import Calender from "./Components/Calender/Calender.jsx";
import ToDo from "./Components/To-Do/ToDo.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Invoice from "./Components/Invoice/Invoice.jsx";
import UIelements from "./Components/UIelements/UIelements.jsx";
import Team from "./Components/Team/Team.jsx";
import Table from "./Components/Table/Table.jsx";
import Settings from "./Components/Settings/Settings.jsx";
import UsersList from "./Components/UsersList/UsersList.jsx";
import ManageAccount from "./Components/ManageAccount/ManageAccount.jsx";
import { Navigate } from "react-router-dom";

let routes = [
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "users-list", element: <UsersList /> },
      { path: "favorites", element: <Favorites /> },
      { path: "inbox", element: <Inbox /> },
      // { path: "orderlists", element: <Orderlists /> },
      { path: "productstock", element: <Productstock /> },
      { path: "pricing", element: <Pricing /> },
      { path: "calender", element: <Calender /> },
      { path: "todo", element: <ToDo /> },
      { path: "contact", element: <Contact /> },
      { path: "invoice", element: <Invoice /> },
      { path: "uIelements", element: <UIelements /> },
      { path: "team", element: <Team /> },
      { path: "table", element: <Table /> },
      { path: "manage-account", element: <ManageAccount /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/status-page",
    element: <StatusPage />,
  },
];

export default routes;
