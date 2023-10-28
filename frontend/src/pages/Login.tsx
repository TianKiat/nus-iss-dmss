"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,

} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";
import Cookies from 'js-cookie';

interface IUserData {
  username: string,
  password: string,
}

interface IUserSessionData {
  userID: string,
  roleID: string,
  profileName: string,
}

function UsernameField({ username, usernameError, onChange }: {
  username: string;
  usernameError: boolean;
  // usernameDup: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <>
      <FormControl
        id="username"
        isRequired
        isInvalid={usernameError}
      >
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={onChange}
          name="username"
        />
        {/* Display error message */}
        {usernameError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
    </>
  )
}

function PasswordsField({ password, passwordError, onChangePassword, showPassword, toggleShowPassword }: {
    password: string;
    passwordError: boolean;
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
  }) {

  return (
    <>
      <FormControl
        id="password"
        isRequired
        isInvalid={passwordError}
      >
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            name="password"
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={toggleShowPassword}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {/* Display error message */}
        {passwordError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
    </>)
}

function ErrorMessage({ showMessage }: {
  showMessage: boolean;
}) {

return (
  <>
    { showMessage ? (<Text color={'red.400'}>Login failed!</Text>) : ''}
  </>)
}

function UserLogin({ formData, error, handleChange, handleSubmit, setLoginStatus }: {
  formData: IUserData;
  error: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  setLoginStatus: boolean;
}) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    // Check if already logged on
    if(Cookies.get('token')){
      window.location.href='../';
    }
  }, []);

  return (
    <>
      <Stack spacing={4}>
        <UsernameField
          username={formData.username}
          usernameError={error.username}
          onChange={handleChange}
        />
        <PasswordsField
          password={formData.password}
          passwordError={error.password}
          onChangePassword={handleChange}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <ErrorMessage
          showMessage={setLoginStatus}
        />

        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </>
  );
}


export default function Login() {
  const apiURL = process.env.VITE_API_BASE_URL;
  const initialUserFormData = {
    username: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialUserFormData);

  const [userErrors, setUserErrors] = useState<Record<string, boolean>>({
    username: false,
    password: false,
  });

  const [showLoginFailMessage, setShowLoginFailMessage] = useState(false);

  const requiredUserFields = [
    "username",
    "password",
  ];

  const handleUserChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    setUserErrors({
      username: false,
      password: false,
    });
  };

  const handleUserSubmit = async () => {
    setShowLoginFailMessage(false);
    // Initialize an array to collect empty field names
    const emptyFields: string[] = [];

    // Check for empty required fields
    requiredUserFields.forEach((fieldName) => {
      if (userData[fieldName as keyof IUserData].trim().length === 0) {
        emptyFields.push(fieldName);
      }
    });

    // Set the error states for all empty fields at once
    setUserErrors((prevErrors) => ({
      ...prevErrors,
      ...emptyFields.reduce((acc, fieldName) => {
        acc[fieldName] = true;
        return acc;
      }, {} as Record<string, boolean>),
    }));

    if (emptyFields.length > 0) {
      // Display an error message or perform some action to inform the user
      console.log("Please fill in all required fields.");
      return; 
    }

    try {
      const response = await fetch(`${apiURL}/login_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const user = await response.json() as IUserSessionData;
        if (Object.keys(user).length != 0) {
          // Login successful
          Cookies.remove('token')
          // 20 minutes cookie
          const expirationTime = new Date(new Date().getTime() + 1200000);
          Cookies.set('token', JSON.stringify(user), { expires: expirationTime });
          window.location.href='../';
        }
        else {
          // Login failed
          setShowLoginFailMessage(true);
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
      setShowLoginFailMessage(true);
    }
  }
  return (
    <>
      <Flex
        minH={"75vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign in
            </Heading>
            <Text fontSize={"lg"} color={"red.200"}>
              To start ordering your favourite foods!
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <UserLogin
              formData={userData}
              error={userErrors}
              handleChange={handleUserChange}
              handleSubmit={handleUserSubmit}
              setLoginStatus={showLoginFailMessage}
            />
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
