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
  Link,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";

interface ICustomerData {
  name: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  reEnterPassword: string,
  role: string,
  otp: string,
}

interface IVendorData extends Omit<ICustomerData, 'name'> {
  shopAddr: string
  shopName: string,
  shopDesc: string,
}

function NameField({ name, nameError, onChange }: {
  name: string;
  nameError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <>
      <FormControl
        id="name"
        isRequired
        isInvalid={nameError}
      >
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={onChange}
          name="name"
        />
        {/* Display error message */}
        {nameError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
      </FormControl>
    </>
  )
}

function UsernameField({ username, usernameError, usernameDup, onChange }: {
  username: string;
  usernameError: boolean;
  usernameDup: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <>
      <FormControl
        id="username"
        isRequired
        isInvalid={usernameError || usernameDup}
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
        {usernameDup ? (<FormErrorMessage>Username already exists</FormErrorMessage>) : ("")}
      </FormControl>
    </>
  )
}

function EmailField({ email, emailError, emailValid, emailDup, onChangeEmail }: {
  email: string;
  emailError: boolean;
  emailValid: boolean;
  emailDup: boolean;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <FormControl
        id="email"
        isRequired
        isInvalid={emailError || !emailValid || emailDup}
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
        {(!emailValid && !emailError && email !== "") ? (<FormErrorMessage>Invalid email address</FormErrorMessage>) : ""}
        {emailDup ? (<FormErrorMessage>Email already exists</FormErrorMessage>) : ("")}

      </FormControl>
    </>
  )
}

function PhoneField({ phone, phoneError, phoneValid, phoneDupError, onChange }: {
  phone: string;
  phoneError: boolean;
  phoneValid: boolean;
  phoneDupError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <FormControl
        id="phone"
        isRequired
        isInvalid={phoneError || !phoneValid || phoneDupError}
      >
        <FormLabel>HP No.</FormLabel>
        <Input
          type="phone"
          value={phone}
          onChange={onChange}
          name="phone"
        />
        {/* Display error message */}
        {phoneError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
        {(!phoneValid && !phoneError && phone !== "") ? (<FormErrorMessage>Invalid phone number - Only 8 digits</FormErrorMessage>) : ""}
        {phoneDupError ? (<FormErrorMessage>HP No. already exists</FormErrorMessage>) : ("")}
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
        <Text color="red.300">Passwords do not match.</Text>
      )}
    </>)
}

function ShopFields({ shopName, shopAddr, shopDesc, shopNameError, shopAddrError, shopDescError, shopNameDupError, shopAddrDupError, onChangeShop }: {
  shopName: string,
  shopAddr: string,
  shopDesc: string,
  shopNameError: boolean;
  shopAddrError: boolean;
  shopDescError: boolean;
  shopNameDupError: boolean;
  shopAddrDupError: boolean;
  onChangeShop: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <FormControl
        id="ShopName"
        isRequired
        isInvalid={shopNameError || shopNameDupError}
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
        {shopNameDupError ? (<FormErrorMessage>Shop Name already exists</FormErrorMessage>) : ("")}
      </FormControl>
      <FormControl
        id="ShopAddr"
        isRequired
        isInvalid={shopAddrError || shopAddrDupError}
      >
        <FormLabel>Shop Address</FormLabel>
        <Input
          type="text"
          value={shopAddr}
          onChange={onChangeShop}
          name="shopAddr"
        />
        {/* Display error message */}
        {shopAddrError ? (<FormErrorMessage>Required</FormErrorMessage>) : ("")}
        {shopAddrDupError ? (<FormErrorMessage>Shop Address already exists</FormErrorMessage>) : ("")}
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
      </FormControl >
    </>
  )
}

function CustomerSignUp({ formData, error, dupError, handleChange, isPasswordMatch, isOpen, handleSubmit, handleOtpSubmit, handleCloseModal, setData, setError }: {
  formData: ICustomerData;
  error: Record<string, boolean>;
  dupError: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordMatch: boolean;
  isOpen: boolean;
  handleSubmit: () => void;
  handleOtpSubmit: () => void;
  handleCloseModal: () => void;
  setData: (formData: Record<string, string>) => void;
  setError: (error: Record<string, boolean>) => void;
}) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const initialRef = useRef(null)

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(60); // Reset countdown when modal closes
    }
  }, [isOpen]);

  const handleResendClick = async () => {
    try {
      const apiURL = process.env.VITE_API_BASE_URL;
      await fetch(`${apiURL}/validate_customer_fields_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
    setData({
      ...formData,
      otp: ""
    })
    setError({
      ...error,
      otp: false
    })
    setCountdown(60);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleCloseModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mb={5}>An email with a OTP has been sent to your email address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              id="otp"
              isRequired
              isInvalid={error.otp}
            >
              <FormLabel>One-Time Pasword</FormLabel>
              <Input
                ref={initialRef}
                type="otp"
                value={formData.otp}
                onChange={handleChange}
                name="otp"
              />
              {error.otp ? (<FormErrorMessage>Please enter the correct OTP - 6 digits only</FormErrorMessage>) : ("")}

            </FormControl>
            {countdown > 0 ? (
              <Box mt={4}>
                Resend OTP in {countdown} seconds
              </Box>
            ) : (
              <Box mt={4} color="blue.400" cursor="pointer" onClick={handleResendClick}>
                Resend OTP
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleOtpSubmit} colorScheme='blue' mr={3}>
              Verify
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={4}>
        <NameField
          name={formData.name}
          nameError={error.name}
          onChange={handleChange}
        />
        <UsernameField
          username={formData.username}
          usernameError={error.username}
          usernameDup={dupError.username}
          onChange={handleChange}
        />
        <EmailField
          email={formData.email}
          emailError={error.email}
          emailValid={error.emailValid}
          emailDup={dupError.email}
          onChangeEmail={handleChange}
        />
        <PhoneField
          phone={formData.phone}
          phoneError={error.phone}
          phoneValid={error.phoneValid}
          phoneDupError={dupError.phone}
          onChange={handleChange}
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

function VendorSignUp({ formData, error, dupError, handleChange, isPasswordMatch, isOpen, handleSubmit, handleOtpSubmit, handleCloseModal, setData, setError }: {
  formData: IVendorData;
  error: Record<string, boolean>;
  dupError: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordMatch: boolean;
  isOpen: boolean;
  handleSubmit: () => void;
  handleOtpSubmit: () => void;
  handleCloseModal: () => void;
  setData: (formData: Record<string, string>) => void;
  setError: (error: Record<string, boolean>) => void;
}) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const initialRef = useRef(null)

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(60); // Reset countdown when modal closes
    }
  }, [isOpen]);

  const handleResendClick = async () => {
    try {
      const apiURL = process.env.VITE_API_BASE_URL;
      await fetch(`${apiURL}/validate_vendor_fields_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
    setData({
      ...formData,
      otp: ""
    })
    setError({
      ...error,
      otp: false
    })
    setCountdown(60);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleCloseModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mb={5}>An email with a OTP has been sent to your email address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              id="otp"
              isRequired
              isInvalid={error.otp}
            >
              <FormLabel>One-Time Password</FormLabel>
              <Input
                ref={initialRef}
                type="otp"
                value={formData.otp}
                onChange={handleChange}
                name="otp"
              />
              {error.otp ? (<FormErrorMessage>Please enter the correct OTP - 6 digits only</FormErrorMessage>) : ("")}
            </FormControl>
            {countdown > 0 ? (
              <Box mt={4}>
                Resend OTP in {countdown} seconds
              </Box>
            ) : (
              <Box mt={4} color="blue.400" cursor="pointer" onClick={handleResendClick}>
                Resend OTP
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleOtpSubmit} colorScheme='blue' mr={3}>
              Verify
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={4}>
        <UsernameField
          username={formData.username}
          usernameError={error.username}
          usernameDup={dupError.username}
          onChange={handleChange}
        />
        <EmailField
          email={formData.email}
          emailError={error.email}
          emailValid={error.emailValid}
          emailDup={dupError.email}
          onChangeEmail={handleChange}
        />
        <PhoneField
          phone={formData.phone}
          phoneError={error.phone}
          phoneValid={error.phoneValid}
          phoneDupError={dupError.phone}
          onChange={handleChange}
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
          shopAddr={formData.shopAddr}
          shopDesc={formData.shopDesc}
          shopNameError={error.shopName}
          shopAddrError={error.shopAddrError}
          shopDescError={error.shopDesc}
          shopNameDupError={dupError.shopName}
          shopAddrDupError={dupError.shopAddr}
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
  const apiURL = process.env.VITE_API_BASE_URL;
  const initialCustomerFormData = {
    role: "3", // Initialize role with a default value
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
    otp: "",
  };

  const initialVendorFormData = {
    role: "2",
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
    shopName: "",
    shopDesc: "",
    shopAddr: "",
    status: 0,
    otp: "",
  };
  const [showAlert, setShowAlert] = useState(false);

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const [customerData, setCustomerData] = useState(initialCustomerFormData);

  const [vendorData, setVendorData] = useState(initialVendorFormData);

  const [isCustomerOpen, setCustomerOpenClose] = useState(false);

  const [isVendorOpen, setVendorOpenClose] = useState(false);

  // Initialize isPasswordMatch to true
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [customerErrors, setCustomerErrors] = useState<Record<string, boolean>>({
    name: false,
    username: false,
    email: false,
    emailValid: true,
    phone: false,
    phoneValid: true,
    password: false,
    reEnterPassword: false,
    otp: false,
  });

  const [customersDupErrors, setCustomerDupErrors] = useState<Record<string, boolean>>({
    username: false,
    email: false,
    phone: false,
  });

  const [vendorErrors, setVendorErrors] = useState<Record<string, boolean>>({
    username: false,
    email: false,
    emailValid: true,
    phone: false,
    phoneValid: true,
    password: false,
    reEnterPassword: false,
    shopName: false,
    shopDesc: false,
    shopAddr: false,
    otp: false,
  });

  const [vendorsDupErrors, setVendorDupErrors] = useState<Record<string, boolean>>({
    ...customersDupErrors,
    shopName: false,
    shopAddr: false,
  });

  const requiredCustomerFields = [
    "name",
    "username",
    "email",
    "phone",
    "password",
    "reEnterPassword",
  ];

  const requiredVendorFields = [
    "username",
    "email",
    "phone",
    "password",
    "reEnterPassword",
    "shopName",
    "shopDesc",
    "shopAddr",
  ];

  // Function to reset form fields
  const resetFormFields = () => {
    setCustomerData(initialCustomerFormData);
    setVendorData(initialVendorFormData);
    setIsPasswordMatch(true); // Reset the password match status
    // Reset errors
    setCustomerErrors({
      name: false,
      username: false,
      email: false,
      emailValid: true,
      phone: false,
      phoneValid: true,
      password: false,
      reEnterPassword: false,
      opt: false,
    });
    setVendorErrors({
      username: false,
      email: false,
      emailValid: true,
      phone: false,
      phoneValid: true,
      password: false,
      reEnterPassword: false,
      shopName: false,
      shopDesc: false,
      shopAddr: false,
      opt: false,
    });
    setCustomerDupErrors({
      username: false,
      email: false,
      phone: false,
    });
    setVendorDupErrors({
      username: false,
      email: false,
      phone: false,
      shopName: false,
      shopAddr: false,
    });
  };

  const handleCustomerChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });

    setCustomerErrors({
      name: false,
      username: false,
      email: false,
      emailValid: true,
      phoneValid: true,
      phone: false,
      password: false,
      reEnterPassword: false,
      opt: false,
    });

    setCustomerDupErrors({
      username: false,
      email: false,
      phone: false,
    });

    // // Check if passwords match and update isPasswordMatch state
    if (name === "password" || name === "reEnterPassword") {
      const newPassword = name === "password" ? value : customerData.password;
      const reEnterPassword = name === "reEnterPassword" ? value : customerData.reEnterPassword;
      setIsPasswordMatch(newPassword === reEnterPassword);
    }
  };

  const handleVendorChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });

    // Reset errors
    setVendorErrors({
      username: false,
      email: false,
      emailValid: true,
      phone: false,
      phoneValid: true,
      password: false,
      reEnterPassword: false,
      shopName: false,
      shopDesc: false,
      shopAddr: false,
      opt: false,
    });

    setVendorDupErrors({
      username: false,
      email: false,
      shopName: false,
      shopAddr: false,
    });

    // Check if passwords match and update isPasswordMatch state
    if (name === "password" || name === "reEnterPassword") {
      const newPassword = name === "password" ? value : vendorData.password;
      const reEnterPassword = name === "reEnterPassword" ? value : vendorData.reEnterPassword;
      setIsPasswordMatch(newPassword === reEnterPassword);
    }
  };

  const handleCustomerSubmit = async () => {
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
    }));// Add this line

    // check email regex
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email);
    setCustomerErrors((prevErrors) => ({
      ...prevErrors,
      emailValid: isEmailValid,
    }));

    const isPhoneValid = /^\d{8}$/.test(customerData.phone);
    setCustomerErrors((prevErrors) => ({
      ...prevErrors,
      phoneValid: isPhoneValid,
    }));

    // Check if passwords match and update isPasswordMatch state
    setIsPasswordMatch(customerData.password === customerData.reEnterPassword);

    if (!isEmailValid) {
      console.log("Invalid email address.");
      return; // Prevent signup when email is invalid
    }

    if (!isPhoneValid) {
      console.log("Invalid phone number.");
      return; // Prevent signup when phone is invalid
    }

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

    try {
      const response = await fetch(`${apiURL}/validate_customer_fields_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.status === 200) {
        // Registration successful, handle accordingly (e.g., show a success message)
        const customer = await response.json();
        if (customer.otp === 1) {
          setCustomerOpenClose(true);
        }
        else {
          if (Object.prototype.hasOwnProperty.call(customer, 'username') && customer.username !== 0) {
            setCustomerDupErrors(prevErrors => ({
              ...prevErrors,
              username: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(customer, 'email') && customer.email !== 0) {
            setCustomerDupErrors(prevErrors => ({
              ...prevErrors,
              email: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(customer, 'phone') && customer.phone !== 0) {
            setCustomerDupErrors(prevErrors => ({
              ...prevErrors,
              phone: true
            }));
          }
        }
      } else {
        // Registration failed, handle accordingly (e.g., show an error message)
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  }

  const handleCustomerOtpSubmit = async () => {
    try {
      const otpResponse = await fetch(`${apiURL}/register_customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (otpResponse.status === 200) {
        const otp = await otpResponse.json();
        if (otp.id === -1) {
          setCustomerErrors((prevErrors) => ({
            ...prevErrors,
            otp: true,
          }));
        }
        else {
          console.log("Customer in DB")
          resetFormFields()
          setCustomerOpenClose(false)
          setShowAlert(true);
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  }

  const closeCustomerModal = async () => {
    setCustomerOpenClose(false)
    setCustomerData((prevErrors) => ({
      ...prevErrors,
      otp: "",
    }));
  }

  const handleVendorSubmit = async () => {
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

    // check email regex
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendorData.email);
    setVendorErrors((prevErrors) => ({
      ...prevErrors,
      emailValid: isEmailValid,
    }));

    const isPhoneValid = /^\d{8}$/.test(vendorData.phone);
    setVendorErrors((prevErrors) => ({
      ...prevErrors,
      phoneValid: isPhoneValid,
    }));

    if (!isEmailValid) {
      console.log("Invalid email address.");
      return; // Prevent signup when email is invalid
    }

    if (!isPhoneValid) {
      console.log("Invalid phone number.");
      return; // Prevent signup when phone is invalid
    }

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

    try {
      const response = await fetch(`${apiURL}/validate_vendor_fields_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (response.status === 200) {
        // Registration successful, handle accordingly (e.g., show a success message)
        const vendor = await response.json();
        if (vendor.otp === 1) {
          setVendorOpenClose(true);
        }
        else {
          if (Object.prototype.hasOwnProperty.call(vendor, 'username') && vendor.username !== 0) {
            setVendorDupErrors(prevErrors => ({
              ...prevErrors,
              username: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(vendor, 'email') && vendor.email !== 0) {
            setVendorDupErrors(prevErrors => ({
              ...prevErrors,
              email: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(vendor, 'phone') && vendor.phone !== 0) {
            setVendorDupErrors(prevErrors => ({
              ...prevErrors,
              phone: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(vendor, 'shopName') && vendor.shopName !== 0) {
            setVendorDupErrors(prevErrors => ({
              ...prevErrors,
              shopName: true
            }));
          }
          if (Object.prototype.hasOwnProperty.call(vendor, 'shopAddr') && vendor.shopAddr !== 0) {
            setVendorDupErrors(prevErrors => ({
              ...prevErrors,
              shopAddr: true
            }));
          }
        }
      } else {
        // Registration failed, handle accordingly (e.g., show an error message)
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  }

  const handleVendorOtpSubmit = async () => {
    try {
      const otpResponse = await fetch(`${apiURL}/register_vendor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (otpResponse.status === 200) {
        const otp = await otpResponse.json();
        if (otp.id === -1) {
          setVendorErrors((prevErrors) => ({
            ...prevErrors,
            otp: true,
          }));
        }
        else {
          console.log("Vendor in DB")
          resetFormFields()
          setVendorOpenClose(false)
          setShowAlert(true);
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors or other exceptions
    }
  }

  const closeVendorModal = async () => {
    setVendorOpenClose(false)
    setVendorData((prevErrors) => ({
      ...prevErrors,
      otp: "",
    }));
  }

  return (
    <>
      {showAlert && (
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={4} fontSize='lg'>
            Registration successful!
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Directing you to the login page.
          </AlertDescription>
        </Alert>
      )}
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
                role: "3"
              })) : setVendorData((prevData) => ({
                ...prevData,
                role: "2"
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
                    dupError={customersDupErrors}
                    handleChange={handleCustomerChange}
                    isPasswordMatch={isPasswordMatch}
                    isOpen={isCustomerOpen}
                    handleSubmit={handleCustomerSubmit}
                    handleOtpSubmit={handleCustomerOtpSubmit}
                    handleCloseModal={closeCustomerModal}
                    setData={(data) => setCustomerData({ ...customerData, ...data })}
                    setError={(error) => setCustomerErrors(error)}
                  />
                </TabPanel>
                <TabPanel>
                  <VendorSignUp
                    formData={vendorData}
                    error={vendorErrors}
                    dupError={vendorsDupErrors}
                    handleChange={handleVendorChange}
                    isPasswordMatch={isPasswordMatch}
                    isOpen={isVendorOpen}
                    handleSubmit={handleVendorSubmit}
                    handleOtpSubmit={handleVendorOtpSubmit}
                    handleCloseModal={closeVendorModal}
                    setData={(data) => setVendorData({ ...vendorData, ...data })}
                    setError={(error) => setVendorErrors(error)}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
