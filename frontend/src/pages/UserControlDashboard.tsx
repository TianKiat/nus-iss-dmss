"use client";

import {
    Box,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Container,
    Select,
    CardBody,
    CardHeader,
    Card,
    Stat,
    StatLabel,
    StatNumber,
    CardFooter
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {Link} from "react-router-dom";


interface UserControlDashboardProps{
  cookies: any
}

export default function UserControlDashboard(props:UserControlDashboardProps){
    if(props.cookies!=null){
        if (props.cookies["roleID"] != 1){
            location.replace('../Error')
        }else{
            //console.log(props.cookies)
        }
        
    }else{
      location.replace('../')
    }

    //const [userControlData, setComplaintData] = useState<IComplaintData>();
    //const [userControlList, setComplaintList] = useState<any[]>([]);
    const [userControlList, setUserControlList] = useState<any[]>([]);
    const [filterSearchCategory, setFilterSearchCategory] = useState("");
    const [filterText, setFilterText] = useState("");
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [numOfUser, setNumOfUser] = useState(0);
    const [numOfCustomer, setNumOfCustomer] = useState(0);
    const [numOfVendor, setNumOfVendor] = useState(0);
    

    useEffect(()=>{
      const fetchUserControlList = async() => {
          try{
              const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/retrieve_user_control`, {
                  method: 'GET',
              });
              if (response.status == 200){
                  const result = await response.json();
                  setNumOfUser(result['total'])
                  setNumOfCustomer(result['customer'])
                  setNumOfVendor(result['vendor'])
                  setUserControlList(result['user_list'])
                  console.log(result['user_list'])

              }else{
                  console.log("here")
              }
      
          }catch (error){
              console.log("here error")
          } 
      }
      fetchUserControlList();
      
    },[]);

    
    
    const searchByFilter = () =>{
      switch(filterSearchCategory){
        case '': setFilteredList(userControlList.filter(c=>c)); break;
        case '2': setFilteredList(userControlList.filter(c=>c.roleID == 2 && c.username.toLowerCase().includes(filterText.toLowerCase())));break;
        case '3': setFilteredList(userControlList.filter(c=>c.roleID == 3 && c.username.toLowerCase().includes(filterText.toLowerCase())));break;
      }

    };

    return (
      <>
        <Container maxW="6xl">
          <Heading paddingBlock={"1.5rem"}>User Dashboard</Heading>
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
          <Heading paddingBlock={"1.5rem"}>Users</Heading>
          <Stack direction={'row'} paddingBottom={2}>
            <Input type = "text" value = {filterText} onChange={(e)=>setFilterText(e.target.value)}></Input>         
            <Select value = {filterSearchCategory} onChange={(e)=>setFilterSearchCategory(e.target.value)}>
              <option value="">All</option>
              <option value="2">Vendor</option>
              <option value="3">Customer</option>
            </Select>
            <Button colorScheme='teal' variant={'solid'} onClick={()=>searchByFilter()} width={'sm'}>Filter</Button>
          </Stack>
          

          <Heading paddingBlock={"1.5rem"}>Search Results</Heading>
          {numOfUser > 0?
            filteredList.length == 0?
              <div>No result meets the criteria</div>
              :<Button colorScheme='teal' variant={'solid'} onClick={()=>(setFilteredList([]))}>Clear Result</Button>
            :<div>No Complaints</div>
          }
          
          {filteredList.map((userControlData) => {return(
            <Card key = {userControlData.userID} id = {userControlData.userID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
              <CardBody>
                <Stack direction={'row'}>
                  <Box width={'60%'}>
                    <Stack direction={'row'}>
                      <Text fontWeight={'bold'}>Username: </Text>
                      <Text fontWeight={'bold'}>{userControlData.username}</Text>
                    </Stack>
                  </Box>
                  <Box width={'40%'}>
                    <Stack direction={'row'}>
                      <Text fontWeight={'bold'}>Role: </Text>
                      <Text fontWeight={'bold'}>
                        {userControlData.roleID == 1?
                        "Admin":userControlData.roleID == 2?
                        "Vendor":userControlData.roleID == 3?
                        "Customer":
                        ""
                        }
                      </Text>
                    </Stack>
                    <Stack direction={'row'}>
                      <Text fontWeight={'bold'}>Status:</Text>
                      <Text fontWeight={'bold'}>
                        {userControlData.isDisabled?
                        "Disabled":
                        "Active"
                        }
                      </Text>
                    </Stack>
                  </Box>
                </Stack>
                
              </CardBody>
              <CardFooter>
              <Link to = {"../user_control"} state={{userID:userControlData.userID}}>
                <Button colorScheme='teal' variant={'solid'} width={'sm'}>View User</Button>
                </Link>
              {/* <Button onClick={handleClickMe(userControlData.userControlID)}>click me</Button> */}
              </CardFooter>
            </Card>
            
            
          )})}
          
          
          
        </Container>
      </>
    )
}