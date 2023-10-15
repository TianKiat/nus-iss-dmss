'use client'

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
interface UserData {
  profileName: string;
  phone: string;
  email: string;
}

interface UserProfileProps {
  userID: number
}

export default function Profile(props: UserProfileProps) {

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState<[string] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [password, setPassword] = useState(''); // State to manage the password input
  const [passwordError, setPasswordError] = useState(''); // State to manage the password errors

  const userId = props.userID;
  
  const handlePasswordSubmit = () => {
    // Here, you can check the password and proceed with editing if it's correct.
    // Add your password checking logic here.
    console.log('Password submitted:', password);
    if(!password){
      setPasswordError("Required")
    }
    else{
      setIsModalOpen(false); // Close the modal
      setPasswordError('')
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_profile/${userId}`);
        const userNameData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_name/${userId}`);
        
        if (userProfileData.ok && userNameData.ok) {
          const profileData = await userProfileData.json();
          const profileUserName = await userNameData.json();
          setUserData(profileData);
          setUserName(profileUserName);
        } else {
          setError('Error fetching user data');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {userData && (
            <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Profile Name
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
                    {userName}
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
              <Flex>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Icon as={BiSolidEditAlt}/>
                  Edit Profile
                </Button>
            </Flex>
            </Stack>
          )}
        </CardBody>
      </Card>
      {/* Password modal */}
      {isModalOpen && (
        <div>
        {/* Render the modal with password input */}
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.4)"
          >
            <Box bg="white" p={4} rounded="md">
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Heading size="sm">Please Enter Password</Heading>
                <Button onClick={() => setIsModalOpen(false)} variant="ghost">
                  <Icon as={AiOutlineClose} />
                </Button>
              </Flex>
            <FormControl
              id="password"
              isRequired
              isInvalid={passwordError == "Required"}
            >
              
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px' }} // Add margin-bottom
              />
              <Button onClick={handlePasswordSubmit}>Submit</Button>
              {/* Display error message */}
              {passwordError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
              <Button onClick={() => setIsModalOpen(false)} variant="outline">
                Cancel
              </Button>
            </FormControl>
            </Box>
          </Box>
        </div>
      )}
    </Flex>
  )
}