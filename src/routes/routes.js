import React from "react";
import { useSelector } from "react-redux";
import { Routes as SwitchRoutes, Route, Navigate } from "react-router-dom";
import { userToken } from "../features/slicer/appSlice";
import AddProduct from "../pages/AddProduct";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/EditProduct";
import Login from "../pages/Login";

export default function Routes() {
  const token = useSelector(userToken);

  return (
    <SwitchRoutes>
      <>
        {token !== "" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/product" element={<AddProduct />} />

            <Route path="/edit-product/:id" element={<EditProduct />} />
          </>
        )}

        <Route path="/login" element={<Login />} />

        <Route
          path="*"
          element={<Navigate to={token === "" ? "/login" : "/dashboard"} />}
        />
      </>
    </SwitchRoutes>
  );
}
