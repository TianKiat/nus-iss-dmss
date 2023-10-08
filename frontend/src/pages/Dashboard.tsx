'use client'

import VendorDashboard from './VendorDashboard'
import CustomerDashboard from './CustomerDashboard'
import { useEffect, useState } from "react"
import { Box, Container, Text } from '@chakra-ui/react'

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
        props.userID == null ?
            // When userID is null aka not login
            <Box p={4}>
                <Container maxW={'5xl'} mt={12}>
                    <Text>Not Login</Text>
                </Container>
            </Box>

            // When userID is not null aka login
            : (role !== 'vendor' ? 
                <CustomerDashboard userID={props.userID}></CustomerDashboard>
                : <VendorDashboard userID={props.userID}></VendorDashboard>
        ) // for now until login and session is done
    );
}