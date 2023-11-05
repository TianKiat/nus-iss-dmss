'use client'

import {

  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';




interface UserControlProps{
    cookies: any
}

export default function UserControl(props:UserControlProps){
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

    const [userControlList, setUserControlList] = useState<any>([]);
    const [showUserControl, setShowUserControl] = useState<any>([]);
    const [userControlStatus, setUserControlStatus] = useState(0);
    const locationObj = useLocation();
    const userID = locationObj != null?locationObj.state.userID:0
    useEffect(()=>{
        const fetchUserControlList = async() => {
          try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/retrieve_user_control_by_id`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'userID': userID }),
            });
            if (response.status == 200){
                const userControl = await response.json();
                setUserControlList(userControl);
                
                
                
            }else{
                console.log("here")
            }
    
          }catch (error){
            console.log("here error")
          } 
        }
        fetchUserControlList();
      },[]);

      const handleUpdateStatus = async (userID: number, status: number)=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update_user_status`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'userID': userID, 'isDisabled':status}),
            });
            if (response.status == 200){
                const result = await response.json();
                console.log(result)
                
                setUserControlStatus(result['status'])
                //setUserControlList(userControl);
                //setStatus({isSuccessful: true})
                //setIsClicked(true);
                
                
            }else{
                //setStatus({isSuccessful: false})
            }
    
          }catch (error){
            //setStatus({isSuccessful: false})
          } 
      }

      useEffect(()=>{
        setShowUserControl(userControlList);
        setUserControlStatus(userControlList.isDisabled)
      },[userControlList])

    return(
        <>
            <Container>
                <Heading paddingBlock={"1.5rem"}>UserControl</Heading>
                <Link to = {"../user_control_dashboard"}>
                    <Button colorScheme='teal' variant={'solid'}>Back to User Control Dashboard</Button>
                </Link>
                <div></div>
                {
                    <Card key = {showUserControl.userID} id = {showUserControl.userID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
                    <CardBody>
                        <Stack direction={'row'}>
                        <Box width={'60%'}>
                            <Stack direction={'row'}>
                            <Text fontWeight={'bold'}>Username: </Text>
                            <Text fontWeight={'bold'}>{showUserControl.username}</Text>
                            </Stack>
                            <Stack direction={'row'}>
                            <Text fontWeight={'bold'}>Role: </Text>
                            <Text fontWeight={'bold'}>
                                {showUserControl.roleID == 1?
                                "Admin":showUserControl.roleID == 2?
                                "Vendor":showUserControl.roleID == 3?
                                "Customer":
                                ""
                                }
                            </Text>
                            </Stack>
                            <Stack direction={'row'}>
                            <Text fontWeight={'bold'}>Status:</Text>
                            <Text fontWeight={'bold'}>
                                {userControlStatus?
                                "Disabled":
                                "Active"
                                }
                            </Text>
                            </Stack>
                        </Box>
                        
                        </Stack>
                        
                    </CardBody>
                    {userControlStatus?
                    <Button colorScheme='teal' variant={'solid'} onClick={()=>handleUpdateStatus(showUserControl.userID, 0)}>Change to Active</Button>
                    :<Button colorScheme='teal' variant={'solid'} onClick={()=>handleUpdateStatus(showUserControl.userID, 1)}>Change to Disabled</Button>
                    }
                    </Card>
                }
                
                
                
            </Container>
            
            
        </>
    )
}