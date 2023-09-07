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

export default function Profile() {
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
          <Stack divider={<StackDivider />} spacing='4'>
            <HStack spacing='100px'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  First Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Justin
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Last Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Ong
                </Text>
              </Box>
            </HStack>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Username
              </Heading>
              <Text pt='2' fontSize='sm'>
                testing
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Email
              </Heading>
              <Text pt='2' fontSize='sm'>
                test@gmail.com
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Password
              </Heading>
              <Text pt='2' fontSize='sm'>
                xxxxxx
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}