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
import CustomerOrder from "./pages/CustomerOrder" ;
import CustomerOrderMenuItem from "./pages/CustomerOrderMenuItem";
import CustomerBasket from "./pages/CustomerBasket";

function App() {
  const userID = 2;
  const username = "Amy";
  const userRole = "vendor";

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userID={userID} username={username} userRole={userRole} />}>
            <Route index element={userID != null ? <Dashboard userID={userID} userRole={userRole}/> : <Home />} />
            <Route path="login" element={<LoginCustomer />} />
            <Route path="vendor/login" element={<LoginVendor />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard userID={userID} userRole={userRole}/>} />
            <Route path="order" element={<CustomerOrder userID={userID}/>} />
            <Route path="basket" element={<CustomerBasket/>} />
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
