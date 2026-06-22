import { Routes, Route } from "react-router";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}