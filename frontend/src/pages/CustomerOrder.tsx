import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import CustomerOrderMenuItem from "./CustomerOrderMenuItem";

interface StoreCardProps {
    vendor: any,
    setVendorProfileIDFunction: Function
}

const StoreCard = (props: StoreCardProps) => {
    return (
        <Button
            w="fit-content"
            h="auto"
            variant="outline"
            onClick={() => {props.setVendorProfileIDFunction(props.vendor)}}>
            <Box
                maxW={{ base: 'full', md: '100%' }}
                w={'full'}
                p={5}>
                <Heading size="lg" mb="0.5rem">{props.vendor["profileName"]}</Heading>
                <Text mb="0.5rem">{props.vendor["address"]}</Text>
                <Text fontSize="xs">{props.vendor["shopDesc"]}</Text>
            </Box>
        </Button>
    )
}

interface CustomerOrderProps {
    userID: number
}

export default function(props: CustomerOrderProps) {
    const [vendorList, setVendorList] = useState([]);
    const [vendor, setVendor] = useState();

    useEffect(() => {
        const fetchAccess = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vendor_profile/get_all`);
            const result = await response.json();
            setVendorList(result);
        }

        fetchAccess();
    }, [])

    return (
        <Box p={4}>
            <Container maxW={'5xl'} mt={12}>
                {vendor != null ?
                    <Box>
                        <Button
                            variant='link'
                            leftIcon={<FaArrowLeftLong />}
                            onClick={() => {setVendor(null)}}>
                            Back
                        </Button>
                        <br/><br/>
                    </Box>
                    : null
                }
                {vendor == null ?
                    <Box>
                        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                            Order
                        </Heading>
                        <br/>
                        <Flex gap="1rem">
                            {vendorList.map((item) => (
                                <StoreCard
                                    key={item["vendorProfileID"]}
                                    vendor={item}
                                    setVendorProfileIDFunction={setVendor}/>
                            ))}
                        </Flex>
                    </Box>
                    : <CustomerOrderMenuItem userID={props.userID} vendor={vendor} />
                }
            </Container>
        </Box>
    )
}