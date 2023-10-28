"use client";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Container,
    FormHelperText,
    Textarea,
    Select,
    Alert,
    FormErrorMessage,
    AlertIcon,
    CardBody,
    StackDivider,
    CardHeader,
    Card,
    Stat,
    StatLabel,
    StatNumber,
    Divider
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

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

interface ComplaintDashboardProps{
    setComplaintID: Function
}

function ComplaintCard({complaint}:{
  complaint: IComplaintData;
  //handleStatusUpdate: (complaintID: number) => void;
  

}){
  return (
    <>
      <Card id = {complaint.complaintID} maxW="6xl" borderStyle={'outset'}>
        <CardHeader>
          <Heading textTransform={'uppercase'}>{complaint.title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack>
            <Box>
              <Heading size={'md'} >{complaint.description}</Heading>
              <Text>{complaint.comment}</Text>
              <Stack direction={['column','row']}>
                <Box>
                  <Text>{complaint.userID}</Text>
                </Box>
                <Box>
                  <Text>{complaint.createdtime}</Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardBody>

        {/* <Button onClick={handleStatusUpdate(complaint.complaintID)}>press me</Button> */}
        <button onClick={console.log("Hello")}>press me</button>
      </Card>
    </>
  )
}

export default function ComplaintDashboard(props: ComplaintDashboardProps){
    const [complaintData, setComplaintData] = useState<IComplaintData>();
    const [complaintList, setComplaintList] = useState([]);
    const [numOfComplaint, setNumOfComplaint] = useState(0);
    const [numOfPendingComplaint, setNumOfPendingComplaint] = useState(0);
    const [numOfNewComplaintToday, setNumOfNewComplaintToday] = useState(0);
    const [filterSearchCategory, setFilterSearchCategory] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterText, setFilterText] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [todayDate, setTodayDate] = useState("");
    

    useEffect(()=>{
      const fetchComplaintList = async() => {
        try{
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_complaint_list`, {
              method: 'GET',
          });
          if (response.status == 200){
              const complaint = await response.json();
              setComplaintList(complaint);
              setNumOfComplaint(complaint.length);
              
              //setNumOfPendingComplaint(complaintList.filter(c=>c).length);
              //console.log(complaintList);
              //console.log(numOfPendingComplaint);
              
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
      // console.log(complaintList.filter(c=>c.status == 'pending').length);
      getTodayDate();
      setNumOfNewComplaintToday(complaintList.filter(c=>c.createdtime.toString().includes(todayDate)).length);
      //console.log(complaintList.filter(c=>c.createdtime.toString().includes(todayDate)));
      //console.log(new Date().toLocaleDateString().replaceAll('/','-'));
      //console.log(numOfNewComplaintToday);
    },[complaintList]);

    const getTodayDate = ()=>{
      let today = new Date().toLocaleDateString().replaceAll('/','-')
      const dateArray = today.split('-');
      let newDate = dateArray[2]+'-'+dateArray[0]+'-'+dateArray[1];
      //console.log(newDate);
      setTodayDate(newDate);
      

    }

    // useEffect(()=>{
    //   const byDate = date => complaint => {return complaint.createdtime.includes(todayDate) && complaint.status.includes("pending")};
    //   console.log(complaintList.filter(byDate(todayDate)).length);
    //   setNumOfNewComplaintToday(complaintList.filter(byDate(todayDate)).length);
      
    // },[todayDate]);

    // const retrieveComplaintList = async () => {
    //   try{
    //       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_complaint_list`, {
    //           method: 'GET',
    //       });
    //       if (response.status == 200){
    //           const complaint = await response.json();
    //           console.log(complaint);
    //           setComplaintList(complaint);
    //       }else{
    //           console.log("here")
    //       }

    //   }catch (error){
    //       console.log("here error")
    //   }
    // }

    
    const handleOnClick = (id: int) => {
        let index = complaintList.findIndex(c => c.complaintID === id);
        const newlist = complaintList.splice(index, 1);
        console.log(newlist, index);
        setComplaintList([...complaintList]);
    };

    const handleClickMe = (complaintID: int) =>()=>{
      console.log("click until me");
      console.log(complaintID);
    }
    // const handleComplaintStatusUpdate = (complaintID: int) => {
    //     console.log(complaintID)
    //     console.log("but why")
    // };

    const checkPendingStatus = () => {
      let counter = 0;
      for(const complaint of complaintList){
        console.log(complaint);
        console.log(complaint.status == 'pending')
        if(complaint.status == 'pending'){  
          counter = counter + 1;
          console.log(counter)
        }
      }
      setNumOfPendingComplaint(counter);
      console.log(numOfPendingComplaint)
    };
    
    const searchByFilter = () =>{
      // console.log(filterText);
      // console.log(filterSearchCategory);
      // console.log(filterStatus);
      // console.log(complaintList.filter(c => c.createdtime.includes(filterText)));

      const byTitle = title => complaint => {return complaint.title.includes(filterText) && complaint.status.includes(filterStatus)};
      const byDescription = description => complaint =>{return complaint.description.includes(filterText) && complaint.status.includes(filterStatus)};
      const byComment = comment => complaint => {return complaint.comment.includes(filterText) && complaint.status.includes(filterStatus)};
      const byUser = user => complaint => {return complaint.userID.toString().includes(filterText) && complaint.status.includes(filterStatus)};
      const byDate = date => complaint => {return complaint.createdtime.includes(filterText) && complaint.status.includes(filterStatus)};
      switch(filterSearchCategory){
        case '': setFilteredList(complaintList.filter(c=>c)); break;
        case 'title': setFilteredList(complaintList.filter(byTitle(filterText)));break;
        case 'description': setFilteredList(complaintList.filter(byDescription(filterText)));break;
        case 'comment': setFilteredList(complaintList.filter(byComment(filterText)));break;
        case 'user': setFilteredList(complaintList.filter(byUser(filterText)));break;
        case 'date': setFilteredList(complaintList.filter(byDate(filterText)));break;

      }
      
    };

    return (
        <Container maxW="6xl">
          <Heading paddingBlock={"1.5rem"}>ComplaintDashboard</Heading>
            <Stack direction={"row"}>
                <Card width = {"50%"}>
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
                <Card width = {"50%"}>
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
          {/* <FormControl>
            <Button onClick={retrieveComplaintList}>refresh</Button>
          </FormControl> */}

            {/* {complaintList.map((complaintData) => (<div key = {complaintData.complaintID} onClick={() => handleOnClick(complaintData.complaintID)}>{complaintData.title}</div>))}    */}
          {/* {complaintList.map((complaintData) => (
            <div key = {complaintData.complaintID}>
              <ComplaintCard
                complaint = {complaintData}
                //handleStatusUpdate={handleComplaintStatusUpdate}
              >  
              </ComplaintCard>
            </div>
            
          ))} */}

          {/* {complaintList.map((complaintData) => (
            <div key = {complaintData.complaintID}>
              <button onClick={handleClickMe(complaintData.complaintID)}>click me</button>
            </div>
            
          ))} */}
          <Heading paddingBlock={"1.5rem"}>Complaints</Heading>
          <Stack direction={'row'} paddingBottom={2}>
            <Input type = "text" value = {filterText} onChange={(e)=>setFilterText(e.target.value)}></Input>         
            <Select value = {filterSearchCategory} onChange={(e)=>setFilterSearchCategory(e.target.value)}>
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="comment">Comment</option>
              <option value="user">User</option>
              <option value="date">Date</option>
            </Select>
            <Select value = {filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
              <option value="">None</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </Select>
            <Button colorScheme='teal' variant={'solid'} onClick={(e)=>searchByFilter()} width={'sm'}>Filter</Button>
          </Stack>
          {/* {complaintList.map((complaintData, index) => (
            <Card key = {complaintData.complaintID} id = {complaintData.complaintID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
              <CardHeader>
                <Heading textTransform={'uppercase'}>{complaintData.title}</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <Box>
                    <Heading size={'md'} >{complaintData.description}</Heading>
                    <Divider size={'md'}/>
                    <Text>{complaintData.comment}</Text>
                    <Stack direction={['column','row']}>
                      <Box>
                        <Text>{complaintData.userID}</Text>
                      </Box>
                      <Box>
                        <Text>{complaintData.createdtime}</Text>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardBody>
              <Link to = {"../complaint"} state={{complaintID:complaintData.complaintID}}>
                <Button>Click Me</Button>
                </Link>
              
            </Card>
            
            
          ))} */}
          {/* <Button onClick={handleClickMe(complaintData.complaintID)}>click me</Button> */}
          {/* {complaintList.filter(c => c.complaintID == 4).map(filteredComplaint=>(
            <div>{filteredComplaint.description}</div>
          ) )}
          {complaintList.filter(c => c.complaintID).map(filteredComplaint=>(
            <div>{filteredComplaint.description}</div>
          ) )} */}

          <Heading paddingBlock={"1.5rem"}>Search Results</Heading>
          {numOfComplaint > 0?
            filteredList.length == 0?
              <div>No result meets the criteria</div>
              :<Button onClick={(e)=>(setFilteredList([]))}>Clear Result</Button>
            :<div>No Complaints</div>
          }

          {filteredList.map((complaintData, index) => {return(
            <Card key = {complaintData.complaintID} id = {complaintData.complaintID} borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'}>
              <CardHeader>
                <Heading textTransform={'uppercase'}>{complaintData.title}</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <Box>
                    <Heading size={'md'} >{complaintData.description}</Heading>
                    <Divider size={'md'}/>
                    <Text>{complaintData.comment}</Text>
                    <Text>Status: {complaintData.status}</Text>
                    <Stack direction={['column','row']}>
                      <Box>
                        <Text>{complaintData.userID}</Text>
                      </Box>
                      <Box>
                        <Text>{complaintData.createdtime}</Text>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardBody>
              <Link to = {"../complaint"} state={{complaintID:complaintData.complaintID}}>
                <Button>Click Me</Button>
                </Link>
              {/* <Button onClick={handleClickMe(complaintData.complaintID)}>click me</Button> */}
            </Card>
            
            
          )})}
          
          
          
        </Container>
    )
}