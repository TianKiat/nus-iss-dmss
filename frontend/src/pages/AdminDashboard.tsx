'use client'

import {
    Box,
    Container,
    Heading,
    Stack,
    Card,
    CardHeader,
    CardBody,
    StatLabel,
    StatNumber,
    Stat,
    Button
} from '@chakra-ui/react';

import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';

// interface IComplaintData{
//     complaintID: string,
//     title: string,
//     description: string,
//     comment: string,
//     userID: number,
//     roleID: number,
//     status: string,
    

// }

// const ComplaintCard = ({ id, title, description }: CardProps) => {
//     return (
//         <Container id = {id} maxW="6xl" borderStyle={'outset'}>
//         <Heading paddingBlock={"1.5rem"} size={'md'}>{title}</Heading>
//         <p>{description}</p>
//         </Container>
//     )
// }

// interface AdminDashboardProps {
//     userID: number
// }



// function ComplaintCard({complaint}:{
//     complaint: IComplaintData;
// }){
//     return (
//         <Container>
            
//         </Container>
//     )
// }

export default function AdminDashboard() {
    //const [complaintData, setComplaintData] = useState<IComplaintData>();
    //const [complaints, setComplaints] = useState([]);
    //const [status, setStatus] = useState<ISubmitFormStatus>({isSuccessful: false})
    const [complaintList, setComplaintList] = useState<any[]>([]);
    const [numOfPendingComplaint, setNumOfPendingComplaint] = useState(0);
    const [numOfNewComplaintToday, setNumOfNewComplaintToday] = useState(0);
    const [todayDate, setTodayDate] = useState("");
    const [numOfUser, setNumOfUser] = useState(0);
    const [numOfCustomer, setNumOfCustomer] = useState(0);
    const [numOfVendor, setNumOfVendor] = useState(0);
    
    useEffect(()=>{
        const fetchComplaintList = async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_complaint_list`, {
                    method: 'GET',
                });
                if (response.status == 200){
                    const complaint = await response.json();
                    setComplaintList(complaint);

                }else{
                    console.log("here")
                }
        
            }catch (error){
                console.log("here error")
            }
            try{
                const response1 = await fetch(`${import.meta.env.VITE_API_BASE_URL}/retrieve_user_control`, {
                    method: 'GET',
                });
                if (response1.status == 200){
                    const result = await response1.json();
                    //console.log(result)
                    setNumOfUser(result['total'])
                    setNumOfCustomer(result['customer'])
                    setNumOfVendor(result['vendor'])

                }else{
                    console.log("here")
                }
        
            }catch (error){
                console.log("here error")
            }  
        }
        
        fetchComplaintList();
        
        
    },[]);
  
    useEffect(()=>{
        setNumOfPendingComplaint(complaintList.filter(c=>c.status == 'pending').length);
        //console.log(complaintList.filter(c=>c.status == 'pending').length);
        
        getTodayDate();
        //console.log(complaintList.filter(c=>c.createdtime.toString().includes(todayDate)).length);
        setNumOfNewComplaintToday(complaintList.filter(c=>c.createdtime.toString().includes(todayDate)).length);
    },[complaintList]);
  
    const getTodayDate = ()=>{
        let today = new Date().toLocaleDateString();
        const dateArray = today.split('/');
        let newDate;
        if(parseInt(dateArray[1])<10){
            newDate = dateArray[2]+'-'+dateArray[0]+'-0'+dateArray[1];
        }else{
            newDate = dateArray[2]+'-'+dateArray[0]+'-'+dateArray[1];
        }
        setTodayDate(newDate);
        
  
    }

    return ( 
        <Container maxW="6xl">
            <Heading paddingBlock={"1.5rem"} textAlign={'center'}>Admin Dashboard</Heading>
            <Container maxW="6xl" padding={'2'}>
                <Heading paddingBlock={"1.5rem"}>Complaints</Heading>
                {/* <Link to = {"./complaint"} state={{complaintID:4}}>
                    <button>Click Me</button>
                </Link> */}
                <Stack direction={"row"} paddingBottom={2}>
                    <Card width = {"50%"} variant={'outline'}>
                        <CardHeader>
                            <Heading>Number of Complaints</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Stat>
                                    <StatLabel>Pending Complaints</StatLabel>
                                    <StatNumber>{numOfPendingComplaint}</StatNumber>
                                </Stat>
                            </Box>
                        </CardBody>
                    </Card>
                    <Card width = {"50%"} variant={'outline'}>
                        <CardHeader>
                            <Heading>New Complaints Today</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Stat>
                                    <StatLabel>New Complaints</StatLabel>
                                    <StatNumber>{numOfNewComplaintToday}</StatNumber>
                                </Stat>
                            </Box>
                        </CardBody>
                    </Card>
                </Stack>
                <Link to = {"./complaint_dashboard"}>
                    <Button colorScheme='teal' variant={'solid'}>Complaint Dashboard</Button>
                </Link>
            </Container>
            <Container maxW="6xl" padding={'2'}>
                <Heading paddingBlock={"1.5rem"}>Manage User</Heading>
                <Stack direction={"row"} paddingBottom={2}>
                    <Card width = {"50%"} variant={'outline'}>
                        <CardHeader>
                            <Heading>Users</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Stat>
                                    <StatLabel>Number of User</StatLabel>
                                    <StatNumber>{numOfUser}</StatNumber>
                                </Stat>
                            </Box>
                        </CardBody>
                    </Card>
                    <Card width = {"50%"} variant={'outline'}>
                        <CardHeader>
                            <Heading>Customer</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Stat>
                                    <StatLabel>Number of Customer</StatLabel>
                                    <StatNumber>{numOfCustomer}</StatNumber>
                                </Stat>
                            </Box>
                        </CardBody>
                    </Card>
                    <Card width = {"50%"} variant={'outline'}>
                        <CardHeader>
                            <Heading>Vendor</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Stat>
                                    <StatLabel>Number of Vendor</StatLabel>
                                    <StatNumber>{numOfVendor}</StatNumber>
                                </Stat>
                            </Box>
                        </CardBody>
                    </Card>
                </Stack>
                <Link to = {"./user_control_dashboard"}>
                    <Button colorScheme='teal' variant={'solid'}>Manage User Dashboard</Button>
                </Link>
            </Container>
            <Container maxW="6xl" padding={'2'}>
                <Heading paddingBlock={"1.5rem"}>Manage Access Control</Heading>
                <Link to = {"./access_control"}>
                    <Button colorScheme='teal' variant={'solid'}>Access Control</Button>
                </Link>
            </Container>
            {/* <Heading paddingBlock={"1rem"} fontSize={"1.5rem"}>Complaints</Heading>
            <Stack direction={"column"}>
                <ComplaintCard
                    id={'1'}
                    title = {"testing"}
                    description={"test"}
                />
                <ComplaintCard
                    id={'2'}
                    title = {"testing"}
                    description={"test"}
                />
                <ComplaintCard
                    id={'3'}
                    title = {"testing"}
                    description={"test"}
                />
            </Stack>
            {complaints?
                <Container>
                    {complaints.map((complaintData) => (<div>{complaintData.title}</div>))}              
                </Container> :""
            } */}
        </Container>
        
        
    )
}