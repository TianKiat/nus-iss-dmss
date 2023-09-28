'use client'

import VendorDashboard from './VendorDashboard'
import CustomerDashboard from './CustomerDashboard'
import { useEffect, useState } from "react"

interface DashboardProps {
    userID : number
    userRole : string
}

export default function Dashboard(props : DashboardProps) {
    const [role, setRole] = useState(props.userRole);

    // useEffect(() => {
    //   const fetchAccess =async () => {
    //     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login_user`);
    //     const result = await response.json();
    //     setRole(result.role);
    //   }
    
    //   fetchAccess();
    // }, [props.userRole])
    
    return (

            role !== 'vendor' ? <CustomerDashboard userID={props.userID}></CustomerDashboard> : <VendorDashboard></VendorDashboard> // for now until login and session is done
    );
}