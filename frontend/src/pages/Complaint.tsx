'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';


interface IComplaintData{
    complaintID: string,
    title: string,
    description: string,
    comment: string,
    userID: number,
    roleID: number,
    status: string,
    createdtime: datetime,

}

interface ComplaintProps {
    complaintID: number
}

export default function Complaint(props : ComplaintProps){
    const [complaintData, setComplaintData] = useState<IComplaintData>();
    const [complaintList, setComplaintList] = useState([]);
    const [status, setStatus] = useState({isSuccessful: false})
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
                console.log(complaint);
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
                setStatus({isSuccessful: true})
                
                
            }else{
                setStatus({isSuccessful: false})
            }
    
          }catch (error){
            setStatus({isSuccessful: false})
          } 
      }

    return(
        <>
            <Container>
                <Heading paddingBlock={"1.5rem"}>Complaint</Heading>
                <Card key = {complaintList.complaintID} id = {complaintList.complaintID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
                <CardHeader>
                    <Heading textTransform={'uppercase'}>{complaintList.title}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                    <Box>
                        <Heading size={'md'} >Description/Category: {complaintList.description}</Heading>
                        <Stack direction={'row'}>
                        <Text fontWeight={'bold'}>Comment: </Text>
                        <Text fontWeight={'bold'}>{complaintList.comment}</Text>
                        </Stack>
                        <Stack direction={'row'}>
                        <Text fontWeight={'bold'}>Status: </Text>
                        <Text fontWeight={'bold'}>{complaintList.status}</Text>
                        </Stack>
                        <Stack direction={'row'}>

                            <Text fontWeight={'bold'}>User:</Text>
                            <Text fontWeight={'bold'}>{complaintList.userID}</Text>

                        </Stack>
                        <Stack direction={'row'}>

                            <Text fontWeight={'bold'}>Created Time:</Text>
                            <Text fontWeight={'bold'}>{complaintList.createdtime}</Text>

                        </Stack>
                    </Box>
                    </Stack>
                </CardBody>
                {complaintList.status == 'done'?
                <Button colorScheme='teal' variant={'outline'}>Already Completed</Button>
                :<Button colorScheme='teal' variant={'solid'} onClick={(e)=>handleUpdateStatus(complaintList.complaintID)}>Resolve</Button>
                
                }
                </Card>
                
            </Container>
            
            
        </>
    )
}