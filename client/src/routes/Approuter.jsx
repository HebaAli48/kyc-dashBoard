import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AuditLogs from "../pages/AuditLogs";
import Home from "../pages/Home"; // Add this import
import Transactions from "../pages/Transactions";
import Setting from "../pages/Setting";
import UsersManagement from "../pages/UsersManagement";

function Approuter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/users-management" element={<UsersManagement />} />
      </Route>
    </Routes>
  );
}

export default Approuter;
