'use client'

import VendorDashboard from './VendorDashboard'
import CustomerDashboard from './CustomerDashboard'
import AdminDashboard from './AdminDashboard'

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

        props.roleID === 2 ? 
            <VendorDashboard userID={props.userID}></VendorDashboard>
            : (props.roleID === 3 ?
                <CustomerDashboard userID={props.userID}></CustomerDashboard>
                : <AdminDashboard userID={props.userID}></AdminDashboard>)

    ); // for now until login and session is done
}