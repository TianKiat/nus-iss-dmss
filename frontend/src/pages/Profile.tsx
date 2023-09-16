'use client'

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
  useColorModeValue,
  Card, CardHeader, CardBody, CardFooter, StackDivider, HStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}
export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null); // Provide type annotation

  useEffect(() => {
    // Make a GET request to your backend API using Python (e.g., Flask)
    fetch('/api/user-profile') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched user data
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Card w='80%' maxW='80%'>
        <CardHeader>
          <Heading size='md'>User Profile</Heading>
        </CardHeader>
        <CardBody>
          {userData && (
            <Stack divider={<StackDivider />} spacing='4'>
              <HStack spacing='100px'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    First Name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {userData.firstName}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Last Name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {userData.lastName}
                  </Text>
                </Box>
              </HStack>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Username
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {userData.userName}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Email
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {userData.email}
                </Text>
              </Box>
            </Stack>
          )}
        </CardBody>
      </Card>
    </Flex>
  )
}