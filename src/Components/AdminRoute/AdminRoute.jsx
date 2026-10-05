import React from "react";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const spinner = (
  <div className="loader-wrapper">
    <Loader />
  </div>
);

const AdminRoute = () => {
  const { session, loading, role, roleStatus } = useSelector(
    (state) => state.auth,
  );

  if (loading) return spinner;

  if (!session) return <Navigate to="/login" replace />;

  if (roleStatus === "idle" || roleStatus === "loading") return spinner;

  if (roleStatus === "succeeded" && role === "admin") return <Outlet />;

  return <Navigate to="/status-page" replace />;
};

export default AdminRoute;
