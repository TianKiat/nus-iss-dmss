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

function App() {
  const userID = 1;
  const username = "Joe";
  const userRole = "customer";

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userID={userID} username={username} />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginCustomer />} />
            <Route path="vendor/login" element={<LoginVendor />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard userID={userID} userRole={userRole}/>} />
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
