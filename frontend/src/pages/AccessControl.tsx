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
    CardFooter,
    CheckboxGroup,
    Checkbox
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import Cookies from 'js-cookie';

interface AccessControlProps{
    cookies: any
}

const enumRole = {
    admin: 1,
    vendor:2,
    customer:3,

}

function load_stuff(){
    
    return(
        <div>hello</div>
    )
}

function displayList(full_list,role_list, onChangeMethod, getNewControl){
    console.log(role_list)
    return(
        <>
            {/* <div>Hello</div>
            {
                Object.keys(full_list).map(key=>{
                    return(
                        <div>
                            <label>{key}</label>
                            <label>{full_list[key]}</label>
                        </div>
                    )
                })
                
            } */}
            <CheckboxGroup defaultValue={role_list}>
                <Stack>
                    {Object.keys(full_list).map(key=>{
                        console.log(key) ;   
                        console.log(role_list.includes(parseInt(key)))   ;  
                        return(
                                              
                            <Checkbox id={key} isChecked={role_list.includes(parseInt(key))} onChange={(e)=>onChangeMethod(key, e.target.checked)}> {full_list[key]}</Checkbox>
                        )
                    })}
                    {/* <Checkbox value={key}>{full_list[key]}</Checkbox> */}
                </Stack>
            </CheckboxGroup>
            <Button onClick={()=>getNewControl()}></Button>
            
        </>
        
    )
}

export default function AccessControl (props:AccessControlProps){
    if(props.cookies!=null){
        if (props.cookies["roleID"] != 1){
            return location.replace('../Error')
        }
        
    }else{
       return location.replace('../')
    }
    const [retrieved, SetRetrieved] = useState([false])
    const [fullAccessControlList, setFullAccessControlList] = useState([]);
    const [tempList, setTempList] = useState([]);
    const [AccessControlListByRole, setAccessControlListByRole] = useState([]);
    const [filterRole, setFilterRole] = useState('Admin');

    function retrieveAccessControl(){
        switch(filterRole){
            case "Admin":
                console.log("Admin")
                getAccessControlList(1);
                break
            case "Vendor":
                console.log("Vendor")
                getAccessControlList(2);
                break
            case "Customer":
                console.log("Customer")
                getAccessControlList(3);
                break
        }
    }

    async function getAccessControlList(access_role_id: int){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_access_list`, {
                method: 'GET',
                
            });
            if (response.status == 200){
                const full_list = await response.json();
                //setComplaints([...complaints, complaint])
                //console.log(Object.keys(full_list));
                //console.log(Object.values(full_list));

                
                setFullAccessControlList(full_list);
                //setFullAccessControlListName(Object.values(full_list));

            }

        }catch (error){
            console.log("got here")
        }
        try{
            const response1 = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_access_list_by_role`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({roleID: access_role_id}),
                
            });
            if (response1.status == 200){
                const full_list = await response1.json();
                //setComplaints([...complaints, complaint])
                console.log(full_list)
                setAccessControlListByRole(full_list);
            }

        }catch (error){
            console.log("got here")
        }
    }

    async function setAccessControlList(access_role_id: int){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update_access_list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({roleID: access_role_id, access_list: tempList}),
            });
            if (response.status == 200){
               console.log("return here")
                //setComplaints([...complaints, complaint])
                //console.log(Object.keys(full_list));
                //console.log(Object.values(full_list));

                
                
                //setFullAccessControlListName(Object.values(full_list));

            }

        }catch (error){
            console.log("got here")
        }
        try{
            const response1 = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_access_list_by_role`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({roleID: access_role_id}),
                
            });
            if (response1.status == 200){
                const full_list = await response1.json();
                //setComplaints([...complaints, complaint])
                console.log(full_list)
                setAccessControlListByRole(full_list);
            }

        }catch (error){
            console.log("got here")
        }
    }

    function onChange(e:any, isChecked){
        if(isChecked){
            if(tempList.includes(e)!=true){
                tempList.push(e);
            }
        }else{
            if(tempList.includes(e)){
                tempList.pop(e);
            }
        }
        
        
    }

    function getNewControl(){
        console.log(tempList);
        switch(filterRole){
            case "Admin":
                console.log("Admin");
                setAccessControlList(1);
                break
            case "Vendor":
                console.log("Vendor");
                setAccessControlList(2);
                break
            case "Customer":
                console.log("Customer");
                setAccessControlList(3);
                break
        }
    }

    return(
        <>
            <Container>
                <Heading paddingBlock={"1rem"} fontSize={"1.5rem"} textAlign='center'>Access Control</Heading>
                <Stack>
                    <Select value = {filterRole} onChange={(e)=>setFilterRole(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Customer">Customer</option>
                    </Select>
                    <Button onClick={()=>retrieveAccessControl()}>Retrieve Access Control For Role</Button>
                </Stack>

                {retrieved?
                displayList(fullAccessControlList,AccessControlListByRole, onChange, getNewControl)
                :""
                }
            </Container>
        </>
    )
    
}