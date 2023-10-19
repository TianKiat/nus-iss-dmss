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
import CustomerBasket from "./pages/CustomerBasket";
import Complaint from "./pages/Complaint";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookies] = useState(Cookies.get("auth"));

  useEffect(() => {
    if (Cookies.get("auth")) {
      setCookies(JSON.parse(Cookies.get("auth")));
    } else {
      setCookies(null);
    }
  }, [Cookies]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout cookies={cookies} />}>
            <Route index element={cookies != null ? <Dashboard userID={cookies["userID"]} roleID={cookies["roleID"]}/> : <Home />} />
            <Route path="login" element={<LoginCustomer />} />
            <Route path="vendor/login" element={<LoginVendor />} />
            <Route path="register" element={<Register />} />
            <Route path="order" element={<CustomerOrder userID={cookies != null ? cookies["userID"] : null}/>} />
            <Route path="basket" element={<CustomerBasket userID={cookies != null ? cookies["userID"] : null}/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
            <Route path="complaint" element={<Complaint/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
