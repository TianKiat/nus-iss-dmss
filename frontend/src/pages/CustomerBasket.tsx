import { Box, Button, Container, Flex, Heading, Icon, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdRemove, MdStore } from "react-icons/md"

function dateStringFormatTransform(date: string) {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);

    switch (month) {
        case "01": month = "Jan"; break;
        case "02": month = "Feb"; break;
        case "03": month = "Mar"; break;
        case "04": month = "Apr"; break;
        case "05": month = "May"; break;
        case "06": month = "Jun"; break;
        case "07": month = "Jul"; break;
        case "08": month = "Aug"; break;
        case "09": month = "Sep"; break;
        case "10": month = "Oct"; break;
        case "11": month = "Nov"; break;
        default: month = "Dec";
    }

    return day + " " + month + " " + year;
}

interface OrderCardProps {
    userID: number,
    invoiceID: number,
    vendorProfileID: number,
    vendorName: string,
    date: string,
    menuitems: string[],
    price: number,
    setUpdateOrderBasketTriggerFunction: Function
}

const OrderCard = (props: OrderCardProps) => {

    const deleteInvoice = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/delete`, {
            method: "POST",
            body: JSON.stringify({invoiceID: props.invoiceID}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result != null) {
            props.setUpdateOrderBasketTriggerFunction(result);
        }
    }

    const menuItemListItem = (item: any) => {
        const updateInvoice = async(quantity: number) => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/update`, {
                method: "POST",
                body: JSON.stringify({
                    userID: props.userID,
                    vendorProfileID: props.vendorProfileID,
                    menuItemID: item["menuItemID"],
                    quantity: quantity
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
    
            const result = await response.json();
            if (result != null) {
                props.setUpdateOrderBasketTriggerFunction(result)
            }
        }

        return (
            <ListItem key={item["menuItemID"]}>
                <Flex flexWrap={{base: 'wrap', md: 'unset'}}>
                    <Text
                        w="275px"
                        display="flex"
                        alignItems="center">
                        {item["foodName"]}
                    </Text>
                    <Flex>
                        <Button
                            isDisabled={item["quantity"] < 1 ? true : false}
                            onClick={() => {updateInvoice(item["quantity"] - 1)}}>
                            <Icon as={MdRemove}/>
                        </Button>
                        <Text
                            w="50px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontWeight="bold">
                            {item["quantity"]}
                        </Text>
                        <Button onClick={() => {updateInvoice(item["quantity"] + 1)}}>
                            <Icon as={MdAdd}/>
                        </Button>
                        <Text
                            w="75px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontWeight="bold">
                            ${item["price"].toFixed(2)}
                        </Text>
                    </Flex>
                </Flex>
            </ListItem>
        )
    }

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            p={3}>
            <Flex w="full" flexDirection={{base: 'column', md: 'row'}}>
                <Box
                    w={{base: 'full', md: '130px'}}
                    p={'16px'}
                    verticalAlign={'top'}
                    display="flex"
                    gap="0.5rem"
                    flexWrap="wrap"
                    justifyContent={'center'}
                    alignContent={'flex-start'}>
                    <Button
                        colorScheme="red"
                        variant="ghost"
                        size="lg"
                        p={2}
                        w="130px"
                        leftIcon={<MdDelete/>}
                        onClick={deleteInvoice}>
                        Delete
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant="ghost"
                        size="lg"
                        p={2}
                        w="130px"
                        leftIcon={<MdStore/>}>
                        Order
                    </Button>
                </Box>
                <Box w={{base:'full', md: 'calc(100% - 130px - 150px)'}} p={'16px'}>
                    <Heading size="lg">{props.vendorName}</Heading>
                    {dateStringFormatTransform(props.date)}
                    <br/><br/>
                    <Heading size="sm" mb="0.5rem">Menu Items</Heading>
                    <UnorderedList
                        display="flex"
                        flexDirection="column"
                        gap="0.5rem">
                        {props.menuitems.map((item) => (
                            menuItemListItem(item)
                        ))}
                    </UnorderedList>
                </Box>
                <Box w={{base: 'full', md: '150px'}} p={'16px'} verticalAlign={'top'} textAlign={{base: 'center', md: 'right'}}>
                    <Heading size="lg">${props.price.toFixed(2)}</Heading>
                </Box>
            </Flex>
        </Box>
    )
}

interface CustomerBasketProps {
    userID: number
}

export default function (props: CustomerBasketProps) {
    const [orderBasket, setOrderBasket] = useState([]);
    const [updateOrderBasketTrigger, setUpdateOrderBasketTrigger] = useState([]);
    
    useEffect(() => {
        const fetchAccess = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/get_basket`, {
                method: 'POST',
                body: JSON.stringify({userID: props.userID}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setOrderBasket(result);
        }

        fetchAccess();
    }, [updateOrderBasketTrigger]);

    return (
        <Box p={4}>
            <Container maxW={'5xl'} mt={12}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Basket
                </Heading>
                <br/>
                <Flex gap="1rem" flexDirection="column">
                    {orderBasket.length > 0 ?
                        orderBasket.map((item) => (
                            <OrderCard
                                key={item["invoice"]["invoiceID"]}
                                userID={props.userID}
                                invoiceID={item["invoice"]["invoiceID"]}
                                vendorProfileID={item["vendor"]["vendorProfileID"]}
                                vendorName={item["vendor"]["profileName"]}
                                date={item["invoice"]["date"]}
                                menuitems={item["orders"]}
                                price={item["invoice"]["totalPrice"]}
                                setUpdateOrderBasketTriggerFunction={setUpdateOrderBasketTrigger}/>
                        ))
                        : <Text>Empty basket</Text>
                    }
                </Flex>
            </Container>
        </Box>
    )
}