import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AuditLogs from "../pages/AuditLogs";
import Home from "../pages/Home"; // Add this import
import Transactions from "../pages/Transactions";
import Setting from "../pages/Setting";
// import UsersManagement from "../pages/UsersManagement";
import Authentication from "../components/authentication/Authentication";
const UsersManagement = lazy(() => import("../pages/UsersManagement"));
const Loading = lazy(() => import("../components/Loading"));

function Approuter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Dashboard />
            </Authentication>
          }
        >
          <Route
            index
            element={
              <Authentication>
                <Home />
              </Authentication>
            }
          />
          <Route
            path="audit-logs"
            element={
              <Authentication>
                <AuditLogs />
              </Authentication>
            }
          />
          <Route
            path="transactions"
            element={
              <Authentication>
                <Transactions />
              </Authentication>
            }
          />
          <Route
            path="/settings"
            element={
              <Authentication>
                <Setting />
              </Authentication>
            }
          />
          <Route
            path="/users-management"
            element={
              <Authentication>
                <UsersManagement />
              </Authentication>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default Approuter;
