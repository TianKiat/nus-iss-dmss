'use client'

import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <Box textAlign="center" py={100} px={6}>
      <Heading
        fontWeight={700}
        fontSize="3xl"
        lineHeight={'110%'}
        color={'green.400'}>
        Page Not Found
      </Heading>
      <Text fontSize="18px" fontWeight="semibold" mt={3} mb={10}>
        The page you&apos;re looking for does not exist
      </Text>

      <Link to="/">
        <Button
          colorScheme={'green'}
          bg={'green.400'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'green.500',
          }}>
          Go to Home
        </Button>
      </Link>
    </Box>
  )
}