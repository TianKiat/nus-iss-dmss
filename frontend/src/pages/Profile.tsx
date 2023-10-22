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
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface UserData {
  userProfileID: number;
  userID: number;
  profileName: string;
  phone: string;
  email: string;
}

interface UserProfileProps {
  userID: number
}

export default function Profile(props: UserProfileProps) {

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalState] = useState(false); // State to control the modal
  const [password, setPassword] = useState(''); // State to manage the password input
  const [passwordError, setPasswordError] = useState(''); // State to manage the password errors
  const [showPassword, setShow] = useState(false)
  const toggleShowPassword = () => setShow(!showPassword)
  const [isAllowEdit, setAllowEdit] = useState(false)

  const userId = props.userID;
  
  const handlePasswordSubmit = async () => {

    if(!password){
      setPasswordError("Required")
    }
    else{
      const checkPassword = await fetch(`${import.meta.env.VITE_API_BASE_URL}/check_password/${userId}/${password}`);
      const checkPasswordResult = await checkPassword.json();
      console.log(checkPasswordResult)
      if(checkPasswordResult){
        setIsModalOpen(false); // Close the modal
        setPasswordError('')
        setAllowEdit(true)
      }
      else {
        setPasswordError("Wrong password, please reenter")
      }
      
    }
  };
  
  const handleSubmitClick = async () => {

    setAllowEdit(false)
    if(userData)
    {
      userData.userID = props.userID;
    } else {
      console.error('userData is null');
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/save_user_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result)
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }

      
  };

  const setIsModalOpen = (state : boolean) => {
    setPassword('')
    setPasswordError('')
    if(state){
      setModalState(true)
    }
    else{
      setModalState(false)
    }
  }
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
                {
                  !isAllowEdit ? (
                    <Text>{userData.profileName}</Text>
                    ) : (
                    <Input
                      value={userData.profileName}
                      onChange={(e) => setUserData({ ...userData, profileName: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Username
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{userName}</Text>
                    ) : (
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Phone Number
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{userData.phone}</Text>
                    ) : (
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Email
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{userData.email}</Text>
                    ) : (
                    <Input
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  )
                }
              </Box>
              <Flex>
                {
                  !isAllowEdit ? (
                    <Button onClick={() => setIsModalOpen(true)}>
                    <Icon as={BiSolidEditAlt}/>
                      Edit Profile
                    </Button>
                    ) : (
                    <InputGroup size='md'>
                      <Button 
                        size='sm'
                        onClick={handleSubmitClick}
                      >
                        Submit
                      </Button>
                      <InputRightElement h={"full"}>
                        <Button 
                          size='sm'
                          mr={6}
                          px = '8'
                          onClick={() => setAllowEdit(false)}
                        >
                          Cancel
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  )
                }
                
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
              isInvalid={passwordError != ""}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: '10px' }} // Add margin-bottom
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon /> }
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* Display error message */}
              {passwordError ? (<FormErrorMessage>{passwordError}</FormErrorMessage>) : ("")}
              <Button onClick={handlePasswordSubmit}>Submit</Button>
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