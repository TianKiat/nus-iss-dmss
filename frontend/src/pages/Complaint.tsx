'use client'

import {
    Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';


// interface IComplaintData{
//     complaintID: string,
//     title: string,
//     description: string,
//     comment: string,
//     userID: number,
//     roleID: number,
//     status: string,
//     createdtime: datetime,

// }

// interface ComplaintProps {
//     complaintID: number
// }

export default function Complaint(){
    //const [complaintData, setComplaintData] = useState<IComplaintData>();
    const [complaintList, setComplaintList] = useState([]);
    const [showComplaint, setShowComplaint] = useState([]);
    const [status, setStatus] = useState({isSuccessful: null});
    const location = useLocation();
    const complaintID = location != null?location.state.complaintID:0
    useEffect(()=>{
        const fetchComplaintList = async() => {
          try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_complaint`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({complaintID: complaintID}),
            });
            if (response.status == 200){
                const complaint = await response.json();
                //console.log(complaint);
                setComplaintList(complaint);
                
                
            }else{
                console.log("here")
            }
    
          }catch (error){
            console.log("here error")
          } 
        }
        fetchComplaintList();
      },[]);

      const handleUpdateStatus = async (complaintID: int)=>{
        console.log("click until me");
        console.log(complaintID);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update_complaint_status`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({complaintID: complaintID, status:"done"}),
            });
            if (response.status == 200){
                const complaint = await response.json();
                //setComplaintList(complaint);
                setStatus({isSuccessful: true})
                
                
            }else{
                setStatus({isSuccessful: false})
            }
    
          }catch (error){
            setStatus({isSuccessful: false})
          } 
      }

      useEffect(()=>{
        setShowComplaint(complaintList);
      },[complaintList])

    return(
        <>
            <Container>
                <Heading paddingBlock={"1.5rem"}>Complaint</Heading>
                <Link to = {"../complaint_dashboard"}>
                    <Button colorScheme='teal' variant={'solid'}>Back to Complaint Dashboard</Button>
                </Link>
                <div></div>
                {showComplaint.map((complaintData) => {return(
                <Card key = {complaintData.complaintID} id = {complaintData.complaintID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
                <CardHeader>
                    <Heading textTransform={'uppercase'}>{complaintData.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                    <Box>
                        <Heading size={'md'} >Description/Category: {complaintData.description}</Heading>
                        <Stack direction={'row'}>
                        <Text fontWeight={'bold'}>Comment: </Text>
                        <Text fontWeight={'bold'}>{complaintData.comment}</Text>
                        </Stack>
                        <Stack direction={'row'}>
                        <Text fontWeight={'bold'}>Status: </Text>
                        <Text fontWeight={'bold'}>{complaintData.status}</Text>
                        </Stack>
                        <Stack direction={'row'}>

                            <Text fontWeight={'bold'}>User:</Text>
                            <Text fontWeight={'bold'}>{complaintData.profileName}</Text>

                        </Stack>
                        <Stack direction={'row'}>

                            <Text fontWeight={'bold'}>Created Time:</Text>
                            <Text fontWeight={'bold'}>{complaintData.createdtime}</Text>

                        </Stack>
                    </Box>
                    </Stack>
                </CardBody>
                {complaintData.status == 'done'?
                <Button colorScheme='teal' variant={'outline'}>Already Completed</Button>
                :<Button colorScheme='teal' variant={'solid'} onClick={()=>handleUpdateStatus(complaintData.complaintID)}>Resolve</Button>
                }
                </Card>
                )})}
                {status.isSuccessful == true? 
                    <Alert status = 'success' rounded='lg' padding='2'>
                        <AlertIcon />
                        Your Request has succesfully been submitted!
                    </Alert>
                    : status.isSuccessful == false?
                    <Alert status = 'error' rounded='lg' padding='2'>
                        <AlertIcon />
                    Your Request has not been submitted! 
                    </Alert>
                    :""
                }
            </Container>
            
            
        </>
    )
}