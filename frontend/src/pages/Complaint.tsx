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

interface ComplaintProps{
    cookies: any
}

export default function Complaint(props:ComplaintProps){
    if(props.cookies!=null){
        if (!props.cookies['access'].includes(5)){
            location.replace('../Error')
        }else{
            // console.log(props.cookies["access"])
            // console.log(props.cookies['access'].includes(5))
        }
        
    }else{
      location.replace('../')
    }
    //const [complaintData, setComplaintData] = useState<IComplaintData>();
    const [complaintList, setComplaintList] = useState<any[]>([]);
    const [showComplaint, setShowComplaint] = useState<any[]>([]);
    const [status, setStatus] = useState({isSuccessful: false});
    const [isClicked, setIsClicked] = useState(false);
    const [complaintStatus, setComplaintStatus] = useState(false);
    const locationObj = useLocation();
    const complaintID = locationObj != null?locationObj.state.complaintID:0
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
                console.log(complaint[0]['status']);
                setComplaintStatus(complaint[0]['status'])
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

      const handleUpdateStatus = async (complaintID: number)=>{
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
                const result = await response.json();
                console.log(result)
                console.log(result['status'])
                setComplaintStatus(result['status'])
                //setComplaintList(complaint);
                setStatus({isSuccessful: true})
                setIsClicked(true);
                
                
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
                            <Text fontWeight={'bold'}>{complaintStatus}</Text>
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
                    )})
                }
                {/* {showComplaint.map((complaintData) => {return(
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
                )})} */}
                {isClicked?
                    status.isSuccessful?
                    <Alert status = 'success' rounded='lg' padding='2'>
                        <AlertIcon />
                        Your Request has succesfully been submitted!
                    </Alert>
                    :
                    <Alert status = 'error' rounded='lg' padding='2'>
                        <AlertIcon />
                    Your Request has not been submitted! 
                    </Alert>
                :<div></div>
                }
                {/* {status.isSuccessful == true? 
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
                } */}
            </Container>
            
            
        </>
    )
}