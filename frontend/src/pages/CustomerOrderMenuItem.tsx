import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdEmail, MdPhone, MdRemove, MdStore } from "react-icons/md"

interface MenuItemPopupProps {
    userID: number,
    menuItem: any,
    setMenuItemPopupFunction: Function,
    setUpdateMenuItemsTriggerFunction: Function
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
                menuItemID: props.menuItem.menuItemID,
                quantity: quantity
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
            alignItems="center">
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
                            w="100%"
                            maxW="500px"
                            aspectRatio="1"/>
                    </Box>
                    <Box w={{base: "100%", md: "auto"}}>
                        <Heading mb="1.5rem">{props.menuItem["menuItemName"]}</Heading>
                        <Text mb="1.5rem">{props.menuItem["menuItemDesc"]}</Text>
                        <Flex mb="1.5rem">
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
                        <Flex mb="1.5rem">
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
    setUpdateMenuItemsTriggerFunction: Function
}

const MenuItemCard = (props: MenuItemCardProps) => {
    const [menuItemPopup, setMenuItemPopup]: any = useState();

    const menuItemPopupTag = (
        <MenuItemPopup
            userID={props.userID}
            menuItem={props.menuItem}
            setMenuItemPopupFunction={setMenuItemPopup}
            setUpdateMenuItemsTriggerFunction={props.setUpdateMenuItemsTriggerFunction}/>
    );

    return (
        <Box>
            <Button
                w="fit-content"
                h="auto"
                p="1rem"
                variant="outline"
                onClick={() => {setMenuItemPopup(menuItemPopupTag)}}>
                <Box
                    maxW={{ base: 'full', md: '200px' }}
                    w={'200px'}>
                    <Image
                        src={""}
                        alt={""}
                        boxSize="200px"
                        borderRadius="5px"
                        objectFit="cover"
                        mb="1rem"/>
                    <Heading size="md" mb="0.5rem">{props.menuItem["menuItemName"]}</Heading>
                    <Text mb="0.5rem">{props.menuItem["menuItemDesc"]}</Text>
                    <Text fontSize="xs">${props.menuItem["price"].toFixed(2)}</Text>
                </Box>
            </Button>
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

    useEffect(() => {
        const fetchAccess = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menu_items/get/${props.vendor["vendorProfileID"]}`);
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
                        userID={props.userID}
                        menuItem={item}
                        setUpdateMenuItemsTriggerFunction={setUpdateMenuItemsTrigger}/>
                ))}
            </Flex>
        </Box>
    )
}