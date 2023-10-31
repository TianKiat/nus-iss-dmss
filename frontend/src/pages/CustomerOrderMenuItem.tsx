import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { ReactElement, useEffect, useState } from "react";
import { MdAdd, MdClose, MdEmail, MdPhone, MdRemove, MdStore } from "react-icons/md"

interface iMenuItem {
    menuItemID: number,
    menuItemName: string,
    price: number,
    menuItemImage: string,
    menuItemDesc: string,
    isValid: boolean,
    vendorProfileID: number
}

interface iMenuItemResponse {
    invoiceID: number | null,
    orderID: number | null,
    orderIDs: number[] | null,
    response: string | null
}

interface MenuItemPopupProps {
    userID: number,
    menuItem: iMenuItem,
    setMenuItemPopupFunction: (popup: ReactElement | null) => void,
    setUpdateMenuItemsTriggerFunction: (response: iMenuItemResponse | null) => void,
    setPopupMessageFunction: (message: string | null) => void
}

const MenuItemPopup = (props: MenuItemPopupProps) => {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(quantity * props.menuItem["price"]);
    }, [quantity])

    const addToBasket = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/update`, {
            method: "POST",
            body: JSON.stringify({
                userID: props.userID,
                vendorProfileID: props.menuItem.vendorProfileID,
                menuItems: [{menuItemID: props.menuItem.menuItemID, quantity: quantity}]
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        if (result != null) {
            props.setMenuItemPopupFunction(null);
            props.setUpdateMenuItemsTriggerFunction(result);

            props.setPopupMessageFunction("Successfully added to the basket");
            setTimeout(() => {
                props.setPopupMessageFunction(null);
            }, 5000);
        }
    }

    return (
        <Box
            position="fixed"
            zIndex={1}
            top={0}
            left={0}
            w="100%"
            h="100%"
            bgColor="blackAlpha.500"
            display="flex"
            alignItems="center"
            overflow="auto">
            <Container maxW="5xl" p={5} bgColor="white">
                <Button
                    colorScheme="red"
                    p={0}
                    float="right"
                    onClick={() => {props.setMenuItemPopupFunction(null)}}>
                    <Icon as={MdClose}/>
                </Button>
                <Flex mt="48px" gap={{base: "1rem", md: "2rem"}} flexDirection={{base: "column", md: "row"}}>
                    <Box w={{base: "100%", md: "400px"}}>
                        {props.menuItem["menuItemImage"] != "" ?
                            <Image
                                src={props.menuItem["menuItemImage"]}
                                alt={props.menuItem["menuItemName"]}
                                w="100%"
                                maxW={{base: "200px", md: "500px"}}
                                aspectRatio="1"/>
                            :
                            <Text
                                w="100%"
                                maxW={{base: "200px", md: "500px"}}
                                aspectRatio="1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bgColor="gray.100"
                                color="gray"
                                fontWeight="bold">
                                NO IMAGE
                            </Text>
                        }
                    </Box>
                    <Box w={{base: "100%", md: "auto"}}>
                        <Heading mb={{base: "0.5rem", md: "1.5rem"}} size={{base: "md", md: "lg"}}>{props.menuItem["menuItemName"]}</Heading>
                        <Text mb={{base: "0.5rem", md: "1.5rem"}}>{props.menuItem["menuItemDesc"]}</Text>
                        <Flex mb={{base: "0.5rem", md: "1.5rem"}}>
                            <Text
                                display="flex"
                                alignItems="center"
                                fontWeight="bold"
                                fontSize="lg"
                                w="150px">
                                Quantity
                            </Text>
                            <Button
                                onClick={() => {setQuantity(quantity - 1)}}
                                isDisabled={quantity > 0 ? false : true}>
                                <Icon as={MdRemove}/>
                            </Button>
                            <Text
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                w="50px"
                                fontWeight="bold"
                                fontSize="lg">
                                {quantity}
                            </Text>
                            <Button
                                onClick={() => {setQuantity(quantity + 1)}}>
                                <Icon as={MdAdd}/>
                            </Button>
                        </Flex>
                        <Flex mb={{base: "0.5rem", md: "1.5rem"}}>
                            <Text
                                display="flex"
                                alignItems="center"
                                fontWeight="bold"
                                fontSize="lg"
                                w="150px">
                                Total Price
                            </Text>
                            <Text
                                display="flex"
                                alignItems="center"
                                fontWeight="bold"
                                fontSize="lg">
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </Flex>
                        <Button
                            isDisabled={quantity > 0 ? false : true}
                            colorScheme="blue"
                            onClick={addToBasket}>
                            Confirm
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

interface iOrder {
    orderID: number,
    menuItemID: number,
    foodName: string,
    quantity: number,
    price: number,
    invoiceID: number
}

interface MenuItemCardProps {
    userID: number,
    menuItem: iMenuItem,
    order: iOrder,
    setUpdateMenuItemsTriggerFunction: (response: iMenuItemResponse | null) => void,
    setPopupMessageFunction: (messsage: string | null) => void
}

const MenuItemCard = (props: MenuItemCardProps) => {
    const [menuItemPopup, setMenuItemPopup] = useState<ReactElement | null>();

    const menuItemPopupTag = (
        <MenuItemPopup
            userID={props.userID}
            menuItem={props.menuItem}
            setMenuItemPopupFunction={setMenuItemPopup}
            setUpdateMenuItemsTriggerFunction={props.setUpdateMenuItemsTriggerFunction}
            setPopupMessageFunction={props.setPopupMessageFunction}/>
    );

    const updateInvoice = async(quantity: number) => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/update`, {
            method: "POST",
            body: JSON.stringify({
                userID: props.userID,
                vendorProfileID: props.menuItem["vendorProfileID"],
                menuItems: [{
                    menuItemID: props.menuItem["menuItemID"],
                    quantity: quantity
                }]
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        if (result != null) {
            props.setUpdateMenuItemsTriggerFunction(result)
        }
    }

    return (
        <Box
            w="fit-content"
            h="auto"
            p="1rem"
            borderWidth={1}
            borderRadius="0.5rem">
            <Box
                maxW={{ base: 'full', md: '200px' }}
                w={'200px'}
                textAlign="center">
                {props.menuItem["menuItemImage"] != "" ?
                    <Image
                        src={props.menuItem["menuItemImage"]}
                        alt={props.menuItem["menuItemName"]}
                        boxSize="200px"
                        borderRadius="5px"
                        objectFit="cover"
                        mb="1rem"/>
                    :
                    <Text
                        boxSize="200px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgColor="gray.100"
                        color="gray"
                        fontWeight="bold"
                        borderRadius="5px"
                        mb="1rem">
                        NO IMAGE
                    </Text>
                }
                <Heading size="md" mb="0.5rem">{props.menuItem["menuItemName"]}</Heading>
                <Text mb="0.5rem">{props.menuItem["menuItemDesc"]}</Text>
                <Text fontSize="xs" mb="1rem">${props.menuItem["price"].toFixed(2)}</Text>
                {props.order != null ?
                    <Flex>
                        <Button
                            size="sm"
                            onClick={() => {updateInvoice(props.order["quantity"] - 1)}}>
                            <Icon as={MdRemove}/>
                        </Button>
                        <Text
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="calc(100% - 76px)"
                            fontWeight="bold"
                            fontSize="md">
                            {props.order["quantity"]}
                        </Text>
                        <Button
                            size="sm"
                            onClick={() => {updateInvoice(props.order["quantity"] + 1)}}>
                            <Icon as={MdAdd}/>
                        </Button>
                    </Flex>
                    :
                    <Button
                        w="full"
                        colorScheme="green"
                        size="sm"
                        onClick={() => {setMenuItemPopup(menuItemPopupTag)}}>
                        Add
                    </Button>
                }
            </Box>
            {menuItemPopup}
        </Box>
    )
}

interface iVendor {
    vendorProfileID: number,
    profileName: string,
    address: string,
    email: string,
    phone: string,
    status: boolean,
    userID: number,
    shopDesc: string
}

interface CustomerOrderMenuItemProps {
    userID: number,
    vendor: iVendor
}

export default function(props: CustomerOrderMenuItemProps) {
    const [menuItems, setMenuItems] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [updateMenuItemsTrigger, setUpdateMenuItemsTrigger] = useState<iMenuItemResponse | null>();
    const [popupMessage, setPopupMessage] = useState<string | null>();

    useEffect(() => {
        const fetchAccess = async() => {
            const menuItemsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menu_items/get_valid`, {
                method: "POST",
                body: JSON.stringify({
                    userID: props.userID,
                    vendorProfileID: props.vendor["vendorProfileID"]
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const menuItemsResult = await menuItemsResponse.json();
            setMenuItems(menuItemsResult);

            const promotionResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/promotion/get/${props.vendor["vendorProfileID"]}`);
            const promotionResult = await promotionResponse.json();
            setPromotions(promotionResult);
        }

        fetchAccess();
    }, [updateMenuItemsTrigger])

    return (
        <Box>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} mb="0.5rem">
                {props.vendor["profileName"]}
            </Heading>
            <Text mb="1rem">
                {props.vendor["shopDesc"]}
            </Text>
            <Flex flexDirection={{base: "column", sm: "row"}} gap={{base: "1.5rem" , md: "0.5rem"}}>
                <Box
                    w={{base: "full", sm: "250px", md: "300px"}}>
                    <Flex color="gray.500">
                        <Box w="50px" display="inline-block">
                            <Icon as={MdStore} fontSize="1.5rem"/>
                        </Box>
                        <Text>
                            {props.vendor["address"]}
                        </Text>
                    </Flex>
                    <Flex color="gray.500">
                        <Box w="50px" display="inline-block">
                            <Icon as={MdPhone} fontSize="1.5rem"/>
                        </Box>
                        <Text>
                            {props.vendor["phone"]}
                        </Text>
                    </Flex>
                    <Flex color="gray.500">
                        <Box w="50px" display="inline-block">
                            <Icon as={MdEmail} fontSize="1.5rem"/>
                        </Box>
                        <Text>
                            {props.vendor["email"]}
                        </Text>
                    </Flex>
                </Box>
                <Box w={{base: "full", sm: "calc(100% - 250px)", md: "calc(100% - 300px)"}}>
                    <Heading fontSize="sm" color="green.500" mb="0.5rem">Promotions</Heading>
                    <Flex w="full" overflowX="auto" gap="0.5rem" pb="0.5rem">
                        {promotions.length > 0 ?
                            promotions.map((item) => (
                                <Box minW="fit-content" w="fit-content" bgColor="green.50" borderWidth="1px" borderColor="green.200" borderRadius="5px" p="5px 10px">
                                    <Heading fontSize="sm">{String(item["promoCode"]).toUpperCase()}</Heading>
                                    <Text fontSize="2xs">Discounts: {item["discountType"] == "ONEFORONE" ? "1-FOR-1" : String(Number(item["discount"]).toFixed(2)).concat("%")}</Text>
                                    <Text fontSize="2xs">Minimum Spending: ${Number(item["minimumSpending"]).toFixed(2)}</Text>
                                </Box>
                            ))
                            : <Text fontSize="sm" color="gray.500">No available promotions</Text>
                        }
                    </Flex>
                </Box>
            </Flex>
            <br/>
            <Flex gap="1rem" flexWrap="wrap">
                {menuItems.map((item) => (
                    <MenuItemCard
                        key={item["menuItem"]["menuItemID"]}
                        userID={props.userID}
                        menuItem={item["menuItem"]}
                        order={item["order"]}
                        setUpdateMenuItemsTriggerFunction={setUpdateMenuItemsTrigger}
                        setPopupMessageFunction={setPopupMessage}/>
                ))}
            </Flex>
            {popupMessage != null ?
                <Text
                    position="fixed"
                    top={{base: "1rem", md: "2rem"}}
                    left="50%"
                    transform="translateX(-50%)"
                    maxW={{base: "300px", md: "500px"}}
                    pt={1.5}
                    pb={1.5}
                    pl={3}
                    pr={3}
                    backgroundColor="green.100"
                    color="green"
                    borderRadius="0.5rem"
                    textAlign="center">
                    {popupMessage}
                </Text>
                : null
            }
        </Box>
    )
}