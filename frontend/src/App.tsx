import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import LoginVendor from "./pages/LoginVendor";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import CustomerOrder from "./pages/CustomerOrder" ;
import CustomerBasket from "./pages/CustomerBasket";
import CreateComplaint from "./pages/CreateComplaint";
import ComplaintDashboard from "./pages/ComplaintDashboard";
import AccessControl from "./pages/AccessControl";
import Complaint from "./pages/Complaint";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface IUserSessionData {
  userID: string,
  roleID: string,
  profileName: string,
}

function App() {
  const [cookies, setCookies] = useState(Cookies.get("token"));
  const apiURL = process.env.VITE_API_BASE_URL;
  
  async function user_token(){
    try {
      const token = JSON.parse(Cookies.get("token"));
    
      if (!token) {
        console.error('No token found in cookies.');
        return null;
      }
      const response = await fetch(`${apiURL}/user_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      });

      if (response.status === 200) {
        setCookies(await response.json() as IUserSessionData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      user_token();
    } else {
      //unathorised or timeout
      setCookies(null);
    }
  }, [Cookies]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout cookies={cookies} />}>
            <Route index element={cookies != null ? <Dashboard userID={cookies["userID"]} roleID={cookies["roleID"]}/> : <Home />} />
            <Route path="login" element={<Login />} />
            <Route path="vendor/login" element={<LoginVendor />} />
            <Route path="register" element={<Register />} />
            <Route path="order" element={<CustomerOrder userID={cookies != null ? cookies["userID"] : null}/>} />
            <Route path="basket" element={<CustomerBasket userID={cookies != null ? cookies["userID"] : null}/>} />
            <Route path="profile" element={<Profile userID={cookies != null ? cookies["userID"] : null}/>} />
            <Route path="*" element={<Error />} />
            <Route path="create_complaint" element={<CreateComplaint/>}/>
            <Route path="complaint_dashboard" element={<ComplaintDashboard/>}/>
            <Route path="complaint" element={<Complaint/>}/>
            <Route path="access_control" element={<AccessControl cookies={cookies}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
