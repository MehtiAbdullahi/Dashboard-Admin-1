import { Children, lazy, Suspense } from "react";

const Landing = lazy(() => import("./Page/Landing/Landing"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const LoginPage = lazy(() => import("./Page/LoginPage/LoginPage"));
const SignUpPage = lazy(() => import("./Page/SignUpPage/SignUpPage"));
const StatusPage = lazy(() => import("./Page/StatusPage/StatusPage"));
const Products = lazy(() => import("./Components/Products/Products.jsx"));
const Favorites = lazy(() => import("./Components/Favorites/Favorites.jsx"));
const Inbox = lazy(() => import("./Components/Inbox/Inbox.jsx"));
const Orderlists = lazy(() => import("./Components/Orderlists/Orderlists.jsx"));
const Productstock = lazy(
  () => import("./Components/Productstock/Productstock.jsx"),
);
const Pricing = lazy(() => import("./Components/Pricing/Pricing.jsx"));
const Calender = lazy(() => import("./Components/Calender/Calender.jsx"));
const ToDo = lazy(() => import("./Components/To-Do/ToDo.jsx"));
const Contact = lazy(() => import("./Components/Contact/Contact.jsx"));
const Invoice = lazy(() => import("./Components/Invoice/Invoice.jsx"));
const UIelements = lazy(() => import("./Components/UIelements/UIelements.jsx"));
const Team = lazy(() => import("./Components/Team/Team.jsx"));
const Table = lazy(() => import("./Components/Table/Table.jsx"));
const Settings = lazy(() => import("./Components/Settings/Settings.jsx"));
const UsersList = lazy(() => import("./Components/UsersList/UsersList.jsx"));
const ManageAccount = lazy(
  () => import("./Components/ManageAccount/ManageAccount.jsx"),
);

import { Navigate } from "react-router-dom";
import Loader from "./Components/Loader/Loader.jsx";

const withSuspense = (element) => (
  <Suspense
    fallback={
      <>
        <div className="loader-wrapper">
          <Loader />
        </div>
      </>
    }
  >
    {element}
  </Suspense>
);

let routes = [
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      { path: "dashboard", element: withSuspense(<Dashboard />) },
      { path: "products", element: withSuspense(<Products />) },
      { path: "users-list", element: withSuspense(<UsersList />) },
      { path: "favorites", element: withSuspense(<Favorites />) },
      { path: "inbox", element: withSuspense(<Inbox />) },
      { path: "orderlists", element: withSuspense(<Orderlists />) },
      { path: "productstock", element: withSuspense(<Productstock />) },
      { path: "pricing", element: withSuspense(<Pricing />) },
      { path: "calender", element: withSuspense(<Calender />) },
      { path: "todo", element: withSuspense(<ToDo />) },
      { path: "contact", element: withSuspense(<Contact />) },
      { path: "invoice", element: withSuspense(<Invoice />) },
      { path: "uIelements", element: withSuspense(<UIelements />) },
      { path: "team", element: withSuspense(<Team />) },
      { path: "table", element: withSuspense(<Table />) },
      { path: "manage-account", element: withSuspense(<ManageAccount />) },
    ],
  },
  {
    path: "/login",
    element: withSuspense(<LoginPage />),
  },
  {
    path: "/sign-up",
    element: withSuspense(<SignUpPage />),
  },
  {
    path: "/status-page",
    element: withSuspense(<StatusPage />),
  },
];

export default routes;
