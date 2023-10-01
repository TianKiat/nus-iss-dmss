import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LoginCustomer from "./pages/LoginCustomer";
import LoginVendor from "./pages/LoginVendor";
import Profile from "./pages/Profile";
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
            <Route path="dashboard" element={<Dashboard userRole="vendor"/>} />
            {/* <Route path="vendor/dashboard" element={<VendorDashboard />} /> */}
            {/* <Route path="vendor/register" element={<RegisterVendor />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
