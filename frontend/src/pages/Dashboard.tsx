'use client'

import VendorDashboard from './VendorDashboard'
import CustomerDashboard from './CustomerDashboard'
import { useEffect, useState } from "react"

interface DashboardProps {
    userID : number
    roleID : number
}

export default function Dashboard(props : DashboardProps) {

    // useEffect(() => {
    //   const fetchAccess =async () => {
    //     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login_user`);
    //     const result = await response.json();
    //     setRole(result.role);
    //   }
    
    //   fetchAccess();
    // }, [props.userRole])
    
    return (
        props.roleID !== 2 ? 
            <CustomerDashboard userID={props.userID}></CustomerDashboard>
            : <VendorDashboard userID={props.userID}></VendorDashboard>
    ); // for now until login and session is done
}