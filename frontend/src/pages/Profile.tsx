'use client'

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
interface UserData {
  profileName: string;
  phone: string;
  username: string;
  email: string;
}
export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null); // Provide type annotation
  const userId = '4';
  const apiUrl = `http://127.0.0.1:8000/user_profile/${userId}`;
  useEffect(() => {
    // Make a GET request to your backend API using Python (e.g., Flask)
    fetch(apiUrl) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
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
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    First Name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {userData.profileName}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Username
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {userData.username}
                  </Text>
                </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Phone Number
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {userData.phone}
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