'use client'

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Link,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    UnorderedList
} from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { FaBowlRice, FaStar } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

function orderStatusTag(status: string) {
    switch(status) {
        case "COMPLETED":
            return <Text bgColor="blue.500" color="white" w="fit-content" p="0.25rem 1rem" borderRadius="0.5rem">Completed</Text>
        case "DONE":
            return <Text bgColor="green.500" color="white" w="fit-content" p="0.25rem 1rem" borderRadius="0.5rem">Ready to collect</Text>
        case "CANCELLED":
            return <Text bgColor="red.500" color="white" w="fit-content" p="0.25rem 1rem" borderRadius="0.5rem">Cancelled</Text>
        case "PENDING":
            return <Text bgColor="orange.500" color="white" w="fit-content" p="0.25rem 1rem" borderRadius="0.5rem">Pending</Text>
        case "DRAFT":
            return <Text bgColor="gray.600" color="white" w="fit-content" p="0.25rem 1rem" borderRadius="0.5rem">Draft</Text>
        default:
            return null
    }
}

function ordersToMenuitemsList(orders: any[]): string[] {
    var menuitems = []
    for (var i = 0; i < orders.length; i++) {
        menuitems.push(orders[i]["quantity"] + " x " + orders[i]["foodName"])
    }
    return menuitems
}

function favoriteIcon(isFavorite: boolean) {
    if (isFavorite) {
        return <Icon as={FaStar} w={8} h={8} color={'gold'}/>
    } else {
        return <Icon as={FaRegStar} w={8} h={8}/>
    }
}

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
    isFavorite: boolean,
    status: string,
    vendorProfileID: number,
    vendorName: string,
    date: string,
    orders: any[],
    price: number,
    discount: number,
    updateOrderHistoryTriggerFunction: Function,
    setPopupErrorMessageFunction: Function
}

const OrderCard = (props: OrderCardProps) => {
    const navigate = useNavigate();

    const updateInvoiceIsFavorite = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/isFavorite/update`, {
            method: "POST",
            body: JSON.stringify({
                invoiceID: props.invoiceID,
                isFavorite: !props.isFavorite
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        props.updateOrderHistoryTriggerFunction(await response.json());
    }

    const cancelInvoice = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/status_discount/update`, {
            method: "POST",
            body: JSON.stringify({
                invoiceID: props.invoiceID,
                status: "CANCELLED"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        props.updateOrderHistoryTriggerFunction(await response.json());
    }

    const collectOrder = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/status_discount/update`, {
            method: "POST",
            body: JSON.stringify({
                invoiceID: props.invoiceID,
                status: "COMPLETED"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        props.updateOrderHistoryTriggerFunction(await response.json());
    }

    const reOrder = async() => {
        var menuItems = []
        for (var i = 0; i < props.orders.length; i++) {
            menuItems.push({
                menuItemID: props.orders[i]["menuItemID"],
                quantity: props.orders[i]["quantity"]
            });
        }
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/update`, {
            method: "POST",
            body: JSON.stringify({
                userID: props.userID,
                vendorProfileID: props.vendorProfileID,
                menuItems: menuItems
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        if (result != null && result["invoiceID"] != null) {
            navigate("/basket", {state: {invoiceID: result["invoiceID"]}})
        } else if (result != null && result["response"] != null) {
            props.setPopupErrorMessageFunction(result["response"]);
            setTimeout(() => {
                props.setPopupErrorMessageFunction(null);
            }, 5000);
        }
    }

    return (
        <Box
            borderWidth="1px"
            borderRadius="6px"
            p={3}>
            <Flex w="full" flexDirection={{base: 'column', md: 'row'}}>
                <Box w={{base: 'full', md: '132px'}} p={'16px'} verticalAlign={'top'} textAlign={'center'}>
                    {props.isFavorite == null ?
                        props.status == "DONE" ?
                            <Button
                                w="100px"
                                colorScheme="blue"
                                onClick={collectOrder}>
                                Collected
                            </Button>
                            :
                            <Button
                                w="100px"
                                colorScheme="red"
                                onClick={cancelInvoice}>
                                Cancel
                            </Button>
                        :
                        <Flex
                            gap="1rem"
                            flexWrap={"wrap"}
                            justifyContent={"center"}>
                            <Button variant={'link'} onClick={updateInvoiceIsFavorite}>
                                {favoriteIcon(props.isFavorite)}
                            </Button>
                            <Button
                                w="100px"
                                colorScheme="green"
                                variant="ghost"
                                isDisabled={props.status == "DONE" ? true : false}
                                onClick={reOrder}>
                                Re-Order
                            </Button>
                        </Flex>
                    }
                </Box>
                <Box w={{base: 'full', md: 'calc(100% - 132px - 200px)'}} p={'16px'}>
                    {orderStatusTag(props.status)}
                    <Heading size="lg">{props.vendorName}</Heading>
                    {dateStringFormatTransform(props.date)}
                    <br/><br/>
                    <Heading size="sm">Menu Items</Heading>
                    <UnorderedList>
                        {ordersToMenuitemsList(props.orders).map((value) => (
                            <ListItem key={value}>{value}</ListItem>
                        ))}
                    </UnorderedList>
                </Box>
                <Box w={{base: 'full', md: '200px'}} p={'16px'} verticalAlign={'top'} textAlign={{base: 'center', md: 'right'}}>
                    <Text>Subtotal: ${props.price.toFixed(2)}</Text>
                    <Text>Discount: -${props.discount.toFixed(2)}</Text>
                    <Heading mt="1rem" size="md">Total: ${Number(props.price - props.discount).toFixed(2)}</Heading>
                </Box>
            </Flex>
        </Box>
    )
}

interface CardProps {
    heading: string
    icon: ReactElement
    link: string
}

const Card = ({ heading, icon, link }: CardProps) => {
    return (
        <Link href={link} _hover={{textDecor: "none"}}>
            <Button
                h="auto"
                p="2rem"
                variant="outline"
                display="flex"
                gap="1rem">
                {icon}
                <Heading size={'md'} color="blue.500">{heading}</Heading>
            </Button>
        </Link>
    )
}

interface CustomerDashboardProps {
    userID: number
}
 
export default function (props : CustomerDashboardProps) {
    const [showOrderList, setShowOrderList] = useState(false);
    const [activeOrder, setActiveOrder] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [favoriteOrder, setFavoriteOrder] = useState([]);
    const [updateOrderHistoryTrigger, setUpdateOrderHistoryTrigger] = useState();
    const [popupErrorMessage, setPopupErrorMessage] = useState();
    const location = useLocation();
    const [popupMessage, setPopupMessage]: any = useState();
    
    useEffect(() => {
        const fetchAccess = async() => {
            setShowOrderList(false);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/get_history`, {
                method: 'POST',
                body: JSON.stringify({userID: props.userID}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            const activeOrderList: any = result.filter(
                (item: { [x: string]: { [x: string]: any } }) => {
                    return item["invoice"]["status"] == "PENDING" || item["invoice"]["status"] == "DONE"
                }
            );
            setActiveOrder(activeOrderList);

            const favoriteOrderList: any = result.filter(
                (item: { [x: string]: { [x: string]: any } }) => {
                    return item["invoice"]["isFavorite"]
                }
            );
            setFavoriteOrder(favoriteOrderList);

            const orderHistoryList: any = result.filter(
                (item: { [x: string]: { [x: string]: any } }) => {
                    return item["invoice"]["status"] == "COMPLETED" || item["invoice"]["status"] == "CANCELLED"
                }
            );
            setOrderHistory(orderHistoryList);

            setShowOrderList(true);
        }

        fetchAccess();

        if (location != null && location.state != null && location.state.popupMessage != null) {
            setPopupMessage(location.state.popupMessage);
            setTimeout(() => {
                setPopupMessage(null);
            }, 5000);
        }
    }, [props.userID, updateOrderHistoryTrigger]);

    return ( 
        <Box p={4}>
            <Container maxW={'5xl'} mt={12}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Dashboard
                </Heading>
                <br/>
                <Flex flexWrap="wrap" gridGap={6}>
                    <Card
                        heading={'Order Food'}
                        icon={<Icon as={FaBowlRice} w={10} h={10} color={'black'}/>}
                        link={'/order'}
                    />
                </Flex>
                <br/>
                <Tabs>
                    <TabList>
                        <Tab>Active Order</Tab>
                        <Tab>Favorite Order</Tab>
                        <Tab>Order History</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Flex gap="1rem" flexDirection="column">
                                {
                                    showOrderList ?
                                        (
                                            activeOrder.length > 0 ?
                                                activeOrder.map((item) => (
                                                    <OrderCard
                                                        key={item["invoice"]["invoiceID"]}
                                                        userID={props.userID}
                                                        invoiceID={item["invoice"]["invoiceID"]}
                                                        isFavorite={null}
                                                        status={item["invoice"]["status"]}
                                                        vendorProfileID={item["vendor"]["vendorProfileID"]}
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        orders={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        discount={item["invoice"]["discount"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
                                                        setPopupErrorMessageFunction={setPopupErrorMessage}
                                                    />
                                                ))
                                                : <Text>No active order</Text>
                                        )
                                        : <Text>Loading ...</Text>
                                }
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex gap="1rem" flexDirection="column">
                                {
                                    showOrderList ?
                                        (
                                            favoriteOrder.length > 0 ?
                                                favoriteOrder.map((item) => (
                                                    <OrderCard
                                                        key={item["invoice"]["invoiceID"]}
                                                        userID={props.userID}
                                                        invoiceID={item["invoice"]["invoiceID"]}
                                                        isFavorite={item["invoice"]["isFavorite"]}
                                                        status={item["invoice"]["status"]}
                                                        vendorProfileID={item["vendor"]["vendorProfileID"]}
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        orders={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        discount={item["invoice"]["discount"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
                                                        setPopupErrorMessageFunction={setPopupErrorMessage}
                                                    />
                                                ))
                                                : <Text>No favorite order</Text>
                                        )
                                        : <Text>Loading ...</Text>
                                }
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex gap="1rem" flexDirection="column">
                                {
                                    showOrderList ?
                                        (
                                            orderHistory.length > 0 ?
                                                orderHistory.map((item) => (
                                                    <OrderCard
                                                        key={item["invoice"]["invoiceID"]}
                                                        userID={props.userID}
                                                        invoiceID={item["invoice"]["invoiceID"]}
                                                        isFavorite={item["invoice"]["isFavorite"]}
                                                        status={item["invoice"]["status"]}
                                                        vendorProfileID={item["vendor"]["vendorProfileID"]}
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        orders={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        discount={item["invoice"]["discount"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
                                                        setPopupErrorMessageFunction={setPopupErrorMessage}
                                                    />
                                                ))
                                                : <Text>No order history</Text>
                                        )
                                        : <Text>Loading ...</Text>
                                }
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                {popupErrorMessage != null ?
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
                        backgroundColor="red.100"
                        color="red"
                        borderRadius="0.5rem"
                        textAlign="center">
                        {popupErrorMessage}
                    </Text>
                    : null
                }
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
            </Container>
        </Box>  
    )
}