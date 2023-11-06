/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Stack,
    Button,
    Heading,
    Container,
    Select,
    CheckboxGroup,
    Checkbox,
    Card,
    Alert,
    AlertIcon,
    CardBody
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

interface AccessControlProps{
    cookies: any
}

export default function AccessControl (props:AccessControlProps){
    if(props.cookies!=null){
        if (props.cookies["roleID"] != 1){
            location.replace('../Error')
        }else{
            //console.log(props.cookies)
        }
        
    }else{
       location.replace('../')
    }

    const [fullAccessControlList, setFullAccessControlList] = useState({});
    const [filterRole, setFilterRole] = useState('Admin');
    const [tempAccessList, setTempAccessList] = useState<any[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [status, setStatus] = useState({isSuccessful: false});

    useEffect(()=>{
        const fetchAccessList = async()=>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_access_list`, {
                    method: 'GET',
                    
                });
                if (response.status == 200){
                    const full_list = await response.json();
    
                    
                    setFullAccessControlList(full_list);
    
    
                }
    
            }catch (error){
                console.log("got here");
            }
        }
        fetchAccessList();
    },[])

    useEffect(()=>{
        setIsClicked(false);
        setStatus({isSuccessful: false})
    },[filterRole])


    async function setAccessControlList(access_role_id: number){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update_access_list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({roleID: access_role_id, access_list: tempAccessList}),
            });
            if (response.status == 200){
                console.log("Updated")
                setIsClicked(true);
                setStatus({isSuccessful: true})
            }else{
                setStatus({isSuccessful: false})
            }

        }catch (error){
            console.log("got here")
        }
        
    }

    function onChangeMethod(key:any, isChecked:any){
        const tempList = tempAccessList;
        //console.log(key.toString())
        if(isChecked){
            if(tempList.includes(key)!=true){
                tempList.push(key);
                setTempAccessList(tempList);
            }
        }else{
            if(tempList.includes(key)){
                const index = tempList.indexOf(key);
                tempList.splice(index, 1);
                setTempAccessList(tempList);
            }
        }
        
        
    }

    function getNewControl(){
        switch(filterRole){
            case "Admin":
                setAccessControlList(1);
                break
            case "Vendor":
                setAccessControlList(2);
                break
            case "Customer":
                setAccessControlList(3);
                break
        }
    }

    return(
        <>
            <Container size={'6xl'}>
                <Heading paddingBlock={"1rem"} fontSize={"1.5rem"} textAlign='center'>Access Control</Heading>

                <Card borderStyle={'outset'} marginBottom={2} marginTop={2} borderRadius={'lg'} padding={3}>
                    <Stack>
                        <Select value = {filterRole} onChange={(e)=>setFilterRole(e.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Customer">Customer</option>
                        </Select>
                        {/* <Button onClick={()=>retrieveAccessControl()}>Retrieve Access Control For Role</Button> */}
                    </Stack>
                    <CardBody>
                    <CheckboxGroup>
                        <Stack spacing={2}>
                            {Object.keys(fullAccessControlList).map((key)=>{
                                return(
                                    
                                    <Checkbox id={key} onChange={(e)=>onChangeMethod(key, e.target.checked)}> {fullAccessControlList[key as keyof typeof fullAccessControlList]}</Checkbox>
                                )
                            })}
                            {/* <Checkbox value={key}>{full_list[key]}</Checkbox> */}
                        </Stack>
                    </CheckboxGroup>
                    </CardBody>
                    <Button bg={"blue.400"} color={"white"} onClick={()=>getNewControl()}>Update Access</Button>
                </Card>
                {!isClicked?
                <div></div>:
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
                }
                <Link to = {"../"}>
                    <Button colorScheme='teal' variant={'solid'}>Back to Admin Dashboard</Button>
                </Link>
            </Container>
        </>
    )
    
}