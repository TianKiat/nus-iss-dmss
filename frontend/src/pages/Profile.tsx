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
  userID: number;
  username: string;
  roleID: number;
  userPassword: string;
}

interface UserProfile {
  userProfileID: number;
  userID: number;
  profileName: string;
  phone: string;
  email: string;
}

interface VendorProfile {
  address: string;
  email: string;
  phone: string;
  profileName: string;
  shopDesc: string | null;
  status: boolean;
  userID: Number;
  vendorProfileID: Number;
}
interface UserProfileProps {
  userID: number
}

export default function Profile(props: UserProfileProps) {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [isVendor, setIsVendor] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
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
    if(isVendor){

      if(vendorProfile){
        vendorProfile.userID = props.userID;
      } else {
        console.error('vendorProfile is null');
      }

    } else {

      if(userProfile){
        userProfile.userID = props.userID;
      } else {
        console.error('userProfile is null');
      }

    }
    
    try {
      let userResponse: Response;
      userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/save_username/${userId}/${userData?.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData?.username, userID: userId }),
        });

      let profileResponse: Response;

      if (isVendor){

        profileResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/save_vendor_profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vendorProfile),
        });

      } else {

        profileResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/save_user_profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userProfile),
        });

      }
      
      if (profileResponse.status === 200) {
        const result = await profileResponse.json();
        console.log(result)
      } else {
        console.error('Error:', profileResponse.statusText);
      }

      if (userResponse.status === 200) {
        const result = await userResponse.json();
        console.log(result)
      } else {
        console.error('Error:', userResponse.statusText);
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
        const userFetchData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_data/${userId}`);
        if (userFetchData.ok) {
          const userDataJson = await userFetchData.json();
          setUserData(userDataJson);
          setError('');
          if(userDataJson){
            if(userDataJson.roleID == 3){
              const userProfileData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_profile/${userId}`);
              if(userProfileData.ok){
                const profileDataJson = await userProfileData.json();
                setUserProfile(profileDataJson);
                setIsVendor(false);
              } else {
                setError('Error fetching user profile');
              }
            } else if(userDataJson.roleID == 2){
              const vendorProfileData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vendor_profile/get/${userId}`);
              if(vendorProfileData.ok){
                const profileDataJson = await vendorProfileData.json();
                setVendorProfile(profileDataJson);
                setIsVendor(true);
              } else {
                setError('Error fetching vendor profile');
              }
            } else {
              setIsVendor(null);
              setError('unable to show Admin profile');
            }
          }
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
          {userProfile && userData && !isVendor && (
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Profile Name
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{userProfile.profileName}</Text>
                    ) : (
                    <Input
                      value={userProfile.profileName}
                      onChange={(e) => setUserProfile({ ...userProfile, profileName: e.target.value })}
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
                    <Text>{userData.username}</Text>
                    ) : (
                    <Input
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
                    <Text>{userProfile.phone}</Text>
                    ) : (
                    <Input
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
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
                    <Text>{userProfile.email}</Text>
                    ) : (
                    <Input
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
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
          {vendorProfile && userData && isVendor &&(
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Profile Name
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{vendorProfile.profileName}</Text>
                    ) : (
                    <Input
                      value={vendorProfile.profileName}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, profileName: e.target.value })}
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
                    <Text>{userData.username}</Text>
                    ) : (
                    <Input
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Address
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{vendorProfile.address}</Text>
                    ) : (
                    <Input
                      value={vendorProfile.address}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, address: e.target.value })}
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
                    <Text>{vendorProfile.email}</Text>
                    ) : (
                    <Input
                      value={vendorProfile.email}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, email: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Phone
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{vendorProfile.phone}</Text>
                    ) : (
                    <Input
                      value={vendorProfile.phone}
                      onChange={(e) => setVendorProfile({ ...vendorProfile, phone: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Shop Description
                </Heading>
                {
                  !isAllowEdit ? (
                    <Text>{vendorProfile.shopDesc}</Text>
                    ) : (
                    <Input
                      value={vendorProfile.shopDesc || ''} 
                      onChange={(e) => setVendorProfile({ ...vendorProfile, shopDesc: e.target.value })}
                    />
                  )
                }
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Status
                </Heading>
                <Text>{vendorProfile.status.toString()}</Text>
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