import "./App.css";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Users from "./components/Users";
import BusinessUsers from "./components/BusinessUsers";
import RingtoneSettings from "./components/RingtoneSettings";
import BusinessDetail from "./components/BusinessDetail"
import Ads from "./components/Ads";
import Reports from "./components/Reports";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="business" element={<BusinessUsers />} />
          <Route path="business/:id" element={<BusinessDetail />} />
          <Route path="ringtone" element={<RingtoneSettings />} />
          <Route path="ads" element={<Ads />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
   
  );
}

export default App;