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
    Table,
    TableContainer,
    Tabs,
    Tbody,
    Td,
    Text,
    Tr,
    UnorderedList
} from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { FaBowlRice, FaStar } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'

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
    vendorName: string,
    date: string,
    menuitems: string[],
    price: number,
    updateOrderHistoryTriggerFunction: Function
}

const OrderCard = (props: OrderCardProps) => {

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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/status/update`, {
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

    return (
        props.isFavorite != null ?
            <Button
                w="full"
                h="auto"
                p={3}
                fontWeight="normal"
                variant="outline">
                <TableContainer w="full">
                    <Table variant='unstyled'>
                        <Tbody>
                            <Tr>
                                <Td w={'68px'} p={'16px'} verticalAlign={'top'}>
                                    <Button variant={'link'} onClick={updateInvoiceIsFavorite}>
                                        {favoriteIcon(props.isFavorite)}
                                    </Button>
                                </Td>
                                <Td p={'16px'}>
                                    {orderStatusTag(props.status)}
                                    <Heading size="lg">{props.vendorName}</Heading>
                                    {dateStringFormatTransform(props.date)}
                                    <br/><br/>
                                    <Heading size="sm">Menu Items</Heading>
                                    <UnorderedList>
                                        {ordersToMenuitemsList(props.menuitems).map((value) => (
                                            <ListItem key={value}>{value}</ListItem>
                                        ))}
                                    </UnorderedList>
                                </Td>
                                <Td w={'150px'} p={'16px'} verticalAlign={'top'} textAlign={'right'}>
                                    <Heading size="lg">${props.price.toFixed(2)}</Heading>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Button>
        : <Box
            borderWidth="1px"
            borderRadius="6px"
            p={3}>
            <TableContainer w="full">
                <Table variant='unstyled'>
                    <Tbody>
                        <Tr>
                            <Td w={'68px'} p={'16px'} verticalAlign={'top'}>
                                <Button
                                    colorScheme="red"
                                    isDisabled={props.status == "DONE" ? true : false}
                                    onClick={cancelInvoice}>
                                    Cancel
                                </Button>
                            </Td>
                            <Td p={'16px'}>
                                {orderStatusTag(props.status)}
                                <Heading size="lg">{props.vendorName}</Heading>
                                {dateStringFormatTransform(props.date)}
                                <br/><br/>
                                <Heading size="sm">Menu Items</Heading>
                                <UnorderedList>
                                    {ordersToMenuitemsList(props.menuitems).map((value) => (
                                        <ListItem key={value}>{value}</ListItem>
                                    ))}
                                </UnorderedList>
                            </Td>
                            <Td w={'150px'} p={'16px'} verticalAlign={'top'} textAlign={'right'}>
                                <Heading size="lg">${props.price.toFixed(2)}</Heading>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
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
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        menuitems={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
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
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        menuitems={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
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
                                                        vendorName={item["vendor"]["profileName"]}
                                                        date={item["invoice"]["date"]}
                                                        menuitems={item["orders"]}
                                                        price={item["invoice"]["totalPrice"]}
                                                        updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
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
            </Container>
        </Box>  
    )
}