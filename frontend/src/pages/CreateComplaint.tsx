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
  Link,
  Container,
  FormHelperText,
  Textarea,
  Select,
  Alert,
  FormErrorMessage,
  AlertIcon
}  from "@chakra-ui/react";
import { error } from "console";
import { useEffect, useState } from "react";
import React from "react";
import { isError } from "util";
import {useLocation} from 'react-router-dom';

interface IComplaintData{
    title: string,
    description: string,
    comment: string,
    userID: number,
    roleID: number
}

interface IFormChecker{
    title?:boolean,
    description?:boolean,
    comment: string
}

interface ComplaintProps{
    userID : number
    roleID : number
}

interface ISubmitFormStatus{
    isSuccessful: boolean
}

interface ISubmitButtonCheck{
    isClicked: boolean
}

// function ComplaintForm({title, error, onChange}:{
//     title: string,
//     error: boolean;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }){
    
//     return(
//         <>
//             <FormControl id = "title" isRequired isInvalid={error}>
//                 <FormLabel>Title</FormLabel>
//                 <Input type="text" value={title} onChange={onChange} name="title"></Input>
//                 <FormErrorMessage>Title is required.</FormErrorMessage>
//             </FormControl>
//             <FormControl id = "title" isRequired isInvalid={error}>
//                 <FormLabel>Title</FormLabel>
//                 <Input type="text" value={title} onChange={onChange} name="title"></Input>
//                 <FormErrorMessage>Title is required.</FormErrorMessage>
//             </FormControl>
//         </>
//     )
// }

function ComplaintForm({formData, error, handleTitleChange, handleDescriptionChange, handleCommentChange, handleSubmit, userInfo, role }:{
    formData: IComplaintData;
    error: IFormChecker;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    //handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    userInfo: number;
    role: number;
}){
        return(
        <>
            <Container padding = '3'>
                <Stack direction = 'column'>
                    <Heading paddingBlock={"1rem"} fontSize={"1.5rem"} textAlign='center'>Submit New Complaint</Heading>
                    <FormControl id = "title" isRequired isInvalid={error.title} padding = '2'>
                        <FormLabel>Title</FormLabel>
                        <Input type="text" value={formData.title} onChange={handleTitleChange} name="title"></Input>
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl id = "description" isRequired isInvalid={error.description} padding = '2'>
                        <FormLabel>Description</FormLabel>
                        <Input type="text" value={formData.description} onChange={handleDescriptionChange} name="description"></Input>
                        <FormErrorMessage>Description is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl id = "comment" padding = '2'>
                        <FormLabel>Comment</FormLabel>
                        <Textarea value={formData.comment} onChange={handleCommentChange} name="comment"></Textarea>
                    </FormControl>
                    <Button colorScheme='teal' variant={'solid'} onClick={handleSubmit}>Submit Complaint</Button>
                </Stack>
            </Container>
              
        </>
    )
}

export default function CreateComplaint(props: ComplaintProps){

    // actual implementation
    const location = useLocation();
    const userID = location != null?location.state.userID:0
    const roleID = location != null?location.state.roleID:0
    
    const initialComplaint = {
        "title":"",
        "description":"",
        "comment":"",
        "userID":userID,
        "roleID":roleID
    };

    // testing
    // const initialComplaint = {
    //     "title":"",
    //     "description":"",
    //     "comment":"",
    //     "userID":2,
    //     "roleID":2
    // };
    
    const [complaintData, setComplaintData] = useState<IComplaintData>(initialComplaint);
    const [error, setError] = useState<IFormChecker>({title:false, description:false});
    const [complaints, setComplaints] = useState([]);
    const [status, setStatus] = useState<ISubmitFormStatus>({isSuccessful: false})
    const [isSubmitted, setSubmittedCheck] = useState<ISubmitButtonCheck>({isClicked: false})

    
    //set field to remove message
    const handleTitleChange = (e) => {
        setSubmittedCheck({isClicked: false})
        
        if (complaintData.title !== '') {
            setError({title: false});
        }
        
        setComplaintData({
            ...complaintData,
            title: e.target.value,
        });
    };

    const handleDescriptionChange = (e) => {
        setSubmittedCheck({isClicked: false})
        if (complaintData.description !== '') {
            setError({description: false});
        }
        
        setComplaintData({
            ...complaintData,
            description: e.target.value
        });
    };

    const handleCommentChange = (e) => {    
        setSubmittedCheck({isClicked: false})    
        setComplaintData({
            ...complaintData,
            comment: e.target.value
        });
    };

    // old implementation
    // const handleComplaintChange = (e) => {
    //     console.log(complaintData);
        
    //     if (complaintData.title !== '') {
    //         setError({title: false});
    //     }

    //     if (complaintData.description !== '') {
    //         setError({description: false});
    //     }
        
    //     setComplaintData({
    //         title: e.target.value,
    //         description: e.target.value
    //     });
    // };

    const handleComplaintSubmit = async () => {
        if (complaintData.title === '') {
            setError({title: true});
            return;
        }
        if (complaintData.description === '') {
            setError({description: true});
            return;
        }
        setSubmittedCheck({isClicked: true})
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/complaint`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(complaintData),
            });
            if (response.status == 200){
                const complaint = await response.json();
                //setComplaints([...complaints, complaint])
                setStatus({isSuccessful: true})
            }else{
                setStatus({isSuccessful: false})
                
            }

        }catch (error){
            setStatus({isSuccessful: false})
        }
    }

    // old implementation
    // const handleOnClick = (id: string) => {
    //     console.log(id);
    //     console.log(complaints);
    //     let index = complaints.findIndex(c => c.title === id);
    //     const newlist = complaints.splice(index, 1);
    //     console.log(newlist, index);
    //     setComplaints([...complaints]);
    // };

    
    return (
        <>
            <Container>
                <Box borderWidth='1px' borderRadius='lg' rounded='lg' boxShadow='lg'>
                    
                    <ComplaintForm
                        formData={complaintData}
                        error={error}
                        handleTitleChange={handleTitleChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleCommentChange={handleCommentChange}    
                        handleSubmit={handleComplaintSubmit}
                        userInfo={userID}
                        role={roleID}
                    />
                </Box>
                {isSubmitted.isClicked ?
                    status.isSuccessful ? 
                        <Alert status = 'success' rounded='lg' padding='2'>
                            <AlertIcon />
                                Your Complaint has succesfully been submitted!
                            </Alert>
                        : <Alert status = 'error' rounded='lg' padding='2'>
                            <AlertIcon />
                            Your Complaint has not been submitted! Please check your input again!
                            </Alert>
                    :""
                }
                
            </Container>
            {/* <Container>
                {complaints.map((complaintData) => (<div key = {complaintData.id} onClick={() => handleOnClick(complaintData.title)}>{complaintData.title}</div>))}              
            </Container> */}
        </>
    );
}

