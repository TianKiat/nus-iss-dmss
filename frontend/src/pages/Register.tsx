"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface ICustomerData {
  clientType: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  reEnterPassword: string,

};

interface IVendorData extends ICustomerData {
  shopName: string,
  shopDesc: string,
}

function NameFields({ firstName, lastName, firstNameError, onChange }: {
  firstName: string;
  firstNameError: boolean;
  lastName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <>
      <HStack>
        <Box>
          <FormControl
            id="firstName"
            isRequired
            isInvalid={firstNameError}
          >
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={onChange}
              name="firstName"
            />
            {/* Display error message */}
            {firstNameError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="lastName"
          >
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={onChange}
              name="lastName"
            />
          </FormControl>
        </Box>
      </HStack>
    </>
  )
}

function EmailField({ email, emailError, onChangeEmail }: {
  email: string;
  emailError: boolean;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <FormControl
        id="email"
        isRequired
        isInvalid={emailError}
      >
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          name="email"
        />
        {/* Display error message */}
        {emailError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
    </>
  )
}

function PasswordsField({ password, reEnterPassword, passwordError, reEnterPasswordError,
  onChangePassword, showPassword, toggleShowPassword, isPasswordMatch }: {
    password: string;
    reEnterPassword: string;
    passwordError: boolean;
    reEnterPasswordError: boolean;
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
    isPasswordMatch: boolean;
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
      <FormControl
        id="passwordCheck"
        isRequired
        isInvalid={reEnterPasswordError}
      >
        <FormLabel>Re-enter Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={reEnterPassword}
            onChange={onChangePassword}
            name="reEnterPassword"
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
        {reEnterPasswordError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
      {isPasswordMatch ? null : (
        <Text color="red.500">Passwords do not match.</Text>
      )}
    </>)
}

function ShopFields({ shopName, shopDesc, shopNameError, shopDescError, onChangeShop }: {
  shopName: string,
  shopDesc: string,
  shopNameError: boolean;
  shopDescError: boolean;
  onChangeShop: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <FormControl
        id="ShopName"
        isRequired
        isInvalid={shopNameError}
      >
        <FormLabel>Shop Name</FormLabel>
        <Input
          type="text"
          value={shopName}
          onChange={onChangeShop}
          name="shopName"
        />
        {/* Display error message */}
        {shopNameError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
      <FormControl
        id="ShopDesc"
        isRequired
        isInvalid={shopDescError}
      >
        <FormLabel>Shop Description</FormLabel>
        <Input
          type="text"
          value={shopDesc}
          onChange={onChangeShop}
          name="shopDesc"
        />
        {/* Display error message */}
        {shopDescError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
    </>
  )
}

function CustomerSignUp({ formData, error, handleChange, isPasswordMatch, handleSubmit }: {
  formData: ICustomerData;
  error: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordMatch: boolean;
  handleSubmit: () => void;
}) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Stack spacing={4}>
        <NameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          firstNameError={error.firstName}
          onChange={handleChange}
        />
        <EmailField
          email={formData.email}
          emailError={error.email}
          onChangeEmail={handleChange}
        />
        <PasswordsField
          password={formData.password}
          reEnterPassword={formData.reEnterPassword}
          passwordError={error.password}
          reEnterPasswordError={error.reEnterPassword}
          onChangePassword={handleChange}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          isPasswordMatch={isPasswordMatch}
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
            Sign up
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Already a user? <Link href="/login" color={"blue.400"}>Login</Link>
          </Text>
        </Stack>
      </Stack>
    </>
  );
}

function VendorSignUp({ formData, error, handleChange, isPasswordMatch, handleSubmit }: {
  formData: IVendorData;
  error: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordMatch: boolean;
  handleSubmit: () => void;
}) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Stack spacing={4}>
        <NameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          firstNameError={error.firstName}
          onChange={handleChange}
        />
        <EmailField
          email={formData.email}
          emailError={error.email}
          onChangeEmail={handleChange}
        />
        <PasswordsField
          password={formData.password}
          reEnterPassword={formData.reEnterPassword}
          passwordError={error.password}
          reEnterPasswordError={error.reEnterPassword}
          onChangePassword={handleChange}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          isPasswordMatch={isPasswordMatch}
        />
        <ShopFields
          shopName={formData.shopName}
          shopDesc={formData.shopDesc}
          shopNameError={error.shopName}
          shopDescError={error.shopDesc}
          onChangeShop={handleChange}
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
            Sign up
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Already a user? <Link href="/login" color={"blue.400"}>Login</Link>
          </Text>
        </Stack>
      </Stack>
    </>
  );
}

export default function Register() {
  const initialCustomerFormData = {
    clientType: "0", // Initialize clientType with a default value
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  };

  const initialVendorFormData = {
    ...initialCustomerFormData,
    shopName: "",
    shopDesc: "",
  }
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const [customerData, setCustomerData] = useState(initialCustomerFormData);

  const [vendorData, setVendorData] = useState(initialVendorFormData);

  // Initialize isPasswordMatch to true
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [customerErrors, setCustomerErrors] = useState<Record<string, boolean>>({
    firstName: false,
    email: false,
    password: false,
    reEnterPassword: false,
  });

  const [vendorErrors, setVendorErrors] = useState<Record<string, boolean>>({
    ...customerErrors,
    shopName: false,
    shopDesc: false,
  });

  const requiredCustomerFields = [
    "firstName",
    "email",
    "password",
    "reEnterPassword",
  ];

  const requiredVendorFields = [
    ...requiredCustomerFields,
    "shopName",
    "shopDesc",
  ];

  // Function to reset form fields
  const resetFormFields = () => {
    setCustomerData(initialCustomerFormData);
    setVendorData(initialVendorFormData);
    setIsPasswordMatch(true); // Reset the password match status
    // Reset errors
    setCustomerErrors({
      firstName: false,
      email: false,
      password: false,
      reEnterPassword: false,
    });
    setVendorErrors({
      firstName: false,
      email: false,
      password: false,
      reEnterPassword: false,
      shopName: false,
      shopDesc: false,
    });
  };

  const handleCustomerChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });

    setCustomerErrors({
      firstName: false,
      email: false,
      password: false,
      reEnterPassword: false,
    });

    // Check if passwords match and update isPasswordMatch state
    if (name === "password" || name === "reEnterPassword") {
      const newPassword = name === "password" ? value : customerData.password;
      const reEnterPassword = name === "reEnterPassword" ? value : customerData.reEnterPassword;
      setIsPasswordMatch(newPassword === reEnterPassword);
    }
  };

  const handleVendorChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });

    // Reset errors
    setVendorErrors({
      firstName: false,
      email: false,
      password: false,
      reEnterPassword: false,
      shopName: false,
      shopDesc: false,
    });

    // Check if passwords match and update isPasswordMatch state
    if (name === "password" || name === "reEnterPassword") {
      const newPassword = name === "password" ? value : vendorData.password;
      const reEnterPassword = name === "reEnterPassword" ? value : vendorData.reEnterPassword;
      setIsPasswordMatch(newPassword === reEnterPassword);
    }
  };

  const handleCustomerSubmit = () => {
    // Initialize an array to collect empty field names
    const emptyFields: string[] = [];

    // Check for empty required fields
    requiredCustomerFields.forEach((fieldName) => {
      if (customerData[fieldName as keyof ICustomerData].trim().length === 0) {
        emptyFields.push(fieldName);
      }
    });

    // Set the error states for all empty fields at once
    setCustomerErrors((prevErrors) => ({
      ...prevErrors,
      ...emptyFields.reduce((acc, fieldName) => {
        acc[fieldName] = true;
        return acc;
      }, {} as Record<string, boolean>),
    }));

    if (emptyFields.length > 0) {
      // Display an error message or perform some action to inform the user
      console.log("Please fill in all required fields.");
      return; // Prevent signup when required fields are empty
    }
    // Check if passwords match
    if (customerData.password !== customerData.reEnterPassword) {
      // Display an error message or perform some action to inform the user
      console.log("Passwords do not match.");
      return; // Prevent signup when passwords don't match
    }
    // Log the formData before sending it to the backend
    console.log('CustomerData to be sent to the backend:', customerData);
  }

  const handleVendorSubmit = () => {
    // Initialize an array to collect empty field names
    const emptyFields: string[] = [];

    // Check for empty required fields
    requiredVendorFields.forEach((fieldName) => {
      if (vendorData[fieldName as keyof IVendorData].trim().length === 0) {
        emptyFields.push(fieldName);
      }
    });

    // Set the error states for all empty fields at once
    setVendorErrors((prevErrors) => ({
      ...prevErrors,
      ...emptyFields.reduce((acc, fieldName) => {
        acc[fieldName] = true;
        return acc;
      }, {} as Record<string, boolean>),
    }));

    if (emptyFields.length > 0) {
      // Display an error message or perform some action to inform the user
      console.log("Please fill in all required fields.");
      return; // Prevent signup when required fields are empty
    }
    // Check if passwords match
    if (vendorData.password !== vendorData.reEnterPassword) {
      // Display an error message or perform some action to inform the user
      console.log("Passwords do not match.");
      return; // Prevent signup when passwords don't match
    }
    // Log the formData before sending it to the backend
    console.log('VendorData to be sent to the backend:', vendorData);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {selectedTab === 0 ? "Sign up as a Customer" : "Sign up as a Vendor"}
          </Heading>
          <Text fontSize={"lg"} color={"red.200"}>
            {selectedTab === 0 ? "Discover a world of flavors at your fingertips" : "Share your signature dishes with a hungry audience"}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Tabs isFitted variant="enclosed" colorScheme="blue" onChange={(selectedTab) => {
            setSelectedTab(selectedTab);
            resetFormFields(); // Reset form fields when tab changes
            selectedTab === 0 ? setCustomerData((prevData) => ({
              ...prevData,
              clientType: "0"
            })) : setVendorData((prevData) => ({
              ...prevData,
              clientType: "1"
            }))
          }}>
            <TabList>
              <Tab value="0">Customer</Tab>
              <Tab value="1">Vendor</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CustomerSignUp
                  formData={customerData}
                  error={customerErrors}
                  handleChange={handleCustomerChange}
                  isPasswordMatch={isPasswordMatch}
                  handleSubmit={handleCustomerSubmit} />
              </TabPanel>
              <TabPanel>
                <VendorSignUp
                  formData={vendorData}
                  error={vendorErrors}
                  handleChange={handleVendorChange}
                  isPasswordMatch={isPasswordMatch}
                  handleSubmit={handleVendorSubmit} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Flex>
  );
}
