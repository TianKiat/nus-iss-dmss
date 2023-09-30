import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import LoginCustomer from "./pages/LoginCustomer";
import LoginVendor from "./pages/LoginVendor";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginCustomer />} />
            <Route path="vendor/login" element={<LoginVendor />} />
            <Route path="register" element={<Register />} />
            <Route path="vendor/dashboard" element={<VendorDashboard />} />
            {/* <Route path="vendor/register" element={<RegisterVendor />} /> */}
            <Route path="dashboard" element={<Dashboard userID={1} userRole="customer"/>} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
