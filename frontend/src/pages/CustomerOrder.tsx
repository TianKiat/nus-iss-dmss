import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import CustomerOrderMenuItem from "./CustomerOrderMenuItem";

function storeOpenCloseStatus(opening_hours: any) {
    const now = new Date();
    const isOpen = opening_hours != null ? opening_hours["isOpen"] : null;
    const openTime = opening_hours != null ? new Date(opening_hours["openTime"]) : null;
    const closeTime = opening_hours != null ? new Date(opening_hours["closingtTime"]) : null;

    if (openTime != null) {
        openTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    }
    if (closeTime != null) {
        closeTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    }

    if (isOpen != null && isOpen && openTime != null && openTime <= now && closeTime != null && closeTime > now ||
        isOpen != null && isOpen && openTime == null && closeTime != null && closeTime > now) {
        return "OPEN";
    } else if (isOpen != null && isOpen && openTime != null && openTime > now) {
        return "WILL OPEN AT " + openTime.getHours().toString().padStart(2, '0') + ":" + openTime.getMinutes().toString().padStart(2, '0');
    } else {
        return null;
    }
}

interface StoreCardProps {
    vendor: any,
    openingHours: any,
    setVendorProfileIDFunction: Function
}

const StoreCard = (props: StoreCardProps) => {
    const now = new Date();
    const storeStatus = storeOpenCloseStatus(props.openingHours[now.getDay() - 1]);

    return (
        <Button
            w={{ base: 'full', sm: 'calc((992px - 2rem) / 3)' }}
            h="auto"
            variant="outline"
            isDisabled={storeStatus != "OPEN"}
            onClick={() => {props.setVendorProfileIDFunction(props.vendor)}}>
            <Box
                w="full"
                p={5}>
                <Heading size="lg" mb="0.5rem">{props.vendor["profileName"]}</Heading>
                <Text mb="0.5rem">{props.vendor["address"]}</Text>
                <Text fontSize="xs" mb="0.5rem">{props.vendor["shopDesc"]}</Text>
                {storeStatus == "OPEN" ?
                    <Text
                        bgColor="green"
                        color="white"
                        p="0.25rem 0.5rem"
                        w="fit-content"
                        m="auto"
                        fontSize="xs"
                        borderRadius="0.25rem">
                        OPEN
                    </Text>
                    : storeStatus != null ?
                        <Text
                            bgColor="orange.500"
                            color="white"
                            p="0.25rem 0.5rem"
                            w="fit-content"
                            m="auto"
                            fontSize="xs"
                            borderRadius="0.25rem">
                            {storeStatus}
                        </Text>
                        :
                        <Text
                            bgColor="red"
                            color="white"
                            p="0.25rem 0.5rem"
                            w="fit-content"
                            m="auto"
                            fontSize="xs"
                            borderRadius="0.25rem">
                            CLOSED
                        </Text>
                }
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
                        <Flex gap="1rem" flexWrap="wrap" justifyContent="center">
                            {vendorList.map((item) => (
                                <StoreCard
                                    key={item["vendor"]["vendorProfileID"]}
                                    vendor={item["vendor"]}
                                    openingHours={item["opening_hours"]}
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