'use client'

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export default function LoginCustomer() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://127.0.0.1:8000/login_user', {
         method: 'POST',
         body: JSON.stringify({
            username: username,
            password: password,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      }).then((res) => res.json())
        .then((data) => {
          if(!isEmpty(data)){ // Login successful
            Cookies.remove('auth')
            // 20 minutes cookie
            const expirationTime = new Date(new Date().getTime() + 1200000);
            Cookies.set('auth', JSON.stringify(data), { expires: expirationTime });
            /* ---- To access data in cookie ----
             JSON.parse(Cookies.get('auth'))['userID']
             JSON.parse(Cookies.get('auth'))['roleID']
             JSON.parse(Cookies.get('auth'))['profileName'] */

            roleRedirect(data['roleID']);
          }
          else{ // Login fail
            window.alert("Login failed!")
            window.location.href='../login';
          }
     })
     .catch((err) => {
        console.log(err.message);
     });
  }

  // empty object validator
  function isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }

  function roleRedirect(roleID: string) {
    if(roleID != ''){ 
      window.location.href='../';
    }
    else{ //No role, error
      window.alert("Login failed!")
      window.location.href='../login';
    }
  }

    useEffect(() => {
    // Check if already logged on
    if(Cookies.get('auth')){
      roleRedirect(JSON.parse(Cookies.get('auth'))['roleID']);
    }
  }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              To start ordering your favourite foods!
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  {/* <Text color={'blue.400'}>Forgot password?</Text> */}
                </Stack>
                <Button type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  )
}