import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdEmail, MdPhone, MdRemove, MdStore } from "react-icons/md"

interface MenuItemPopupProps {
    userID: number,
    menuItem: any,
    setMenuItemPopupFunction: Function,
    setUpdateMenuItemsTriggerFunction: Function,
    setPopupMessageFunction: Function
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
                        <Image
                            src={props.menuItem["menuItemImage"]}
                            alt={props.menuItem["menuItemName"]}
                            w="100%"
                            maxW={{base: "200px", md: "500px"}}
                            aspectRatio="1"/>
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

interface MenuItemCardProps {
    userID: number,
    menuItem: any,
    order: any,
    setUpdateMenuItemsTriggerFunction: Function,
    setPopupMessageFunction: Function
}

const MenuItemCard = (props: MenuItemCardProps) => {
    const [menuItemPopup, setMenuItemPopup]: any = useState();

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
                <Image
                    src={props.menuItem["menuItemImage"]}
                    alt={props.menuItem["menuItemName"]}
                    boxSize="200px"
                    borderRadius="5px"
                    objectFit="cover"
                    mb="1rem"/>
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

interface CustomerOrderMenuItemProps {
    userID: number,
    vendor: any
}

export default function(props: CustomerOrderMenuItemProps) {
    const [menuItems, setMenuItems] = useState([]);
    const [updateMenuItemsTrigger, setUpdateMenuItemsTrigger] = useState();
    const [popupMessage, setPopupMessage]: any = useState();

    useEffect(() => {
        const fetchAccess = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menu_items/get_valid`, {
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
            const result = await response.json();
            setMenuItems(result)
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