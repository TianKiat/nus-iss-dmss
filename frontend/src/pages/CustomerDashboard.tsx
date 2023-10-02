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

interface LongCardProps {
    userID: number
    invoiceID: number
    isFavorite: boolean
    vendorName: string
    date: string
    menuitems: string[]
    price: number
    updateOrderHistoryTriggerFunction: Function
}

const LongCard = (props: LongCardProps) => {

    const updateInvoiceIsFavorite = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update_favorite_order`, {
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

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            marginBottom={3}
            p={3}>
            <TableContainer>
                <Table variant='unstyled'>
                    <Tbody>
                        <Tr>
                            <Td w={'68px'} p={'16px'} verticalAlign={'top'}>
                                <Button variant={'link'} onClick={updateInvoiceIsFavorite}>
                                    {/* {favoriteIcon(isFavoriteOrder)} */}
                                    {favoriteIcon(props.isFavorite)}
                                </Button>
                            </Td>
                            <Td p={'16px'}>
                                <Heading size="lg">{props.vendorName}</Heading>
                                {props.date}
                                <br/><br/>
                                <Heading size="sm">Menu Items</Heading>
                                <UnorderedList>
                                    {props.menuitems.map((value) => (
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
        <Link href={link}>
            <Box
                maxW={{ base: 'full', md: '275px' }}
                w={'full'}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={5}>
                <Table variant={'unstyled'}>
                    <Tbody>
                        <Tr>
                            <Td p={'16px'}>
                                {icon}
                            </Td>
                            <Td p={'16px'}>
                                <Button variant={'link'} colorScheme='blue'>
                                    <Heading size={'md'}>{heading}</Heading>
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </Link>
    )
}

interface CustomerDashboardProps {
    userID: number
}
 
export default function (props : CustomerDashboardProps) {
    const [showOrderList, setShowOrderList] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [favoriteOrder, setFavoriteOrder] = useState([]);
    const [updateOrderHistoryTrigger, setUpdateOrderHistoryTrigger] = useState();
    
    useEffect(() => {
        const fetchAccess = async() => {
            setShowOrderList(false);
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order_history`, {
                method: 'POST',
                body: JSON.stringify({userID: props.userID}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setOrderHistory(result);

            const favoriteOrderList: any = result.filter(
                (item: { [x: string]: { [x: string]: any } }) => {
                    return item["invoice"]["isFavorite"]
                }
            );
            setFavoriteOrder(favoriteOrderList);

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
                        link={'#'}
                    />
                </Flex>
                <br/>
                <Tabs>
                    <TabList>
                        <Tab>Favorite Order</Tab>
                        <Tab>Order History</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                showOrderList ?
                                    (
                                        favoriteOrder.length > 0 ?
                                            favoriteOrder.map((item) => (
                                                <LongCard
                                                    key={item["invoice"]["invoiceID"]}
                                                    userID={props.userID}
                                                    invoiceID={item["invoice"]["invoiceID"]}
                                                    isFavorite={item["invoice"]["isFavorite"]}
                                                    vendorName={item["vendor"]["profileName"]}
                                                    date={dateStringFormatTransform(item["invoice"]["date"])}
                                                    menuitems={ordersToMenuitemsList(item["orders"])}
                                                    price={item["invoice"]["totalPrice"]}
                                                    updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
                                                />
                                            ))
                                            : <Text>No favorite order</Text>
                                    )
                                    : <Text>Loading ...</Text>
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                showOrderList ?
                                    (
                                        orderHistory.length > 0 ?
                                            orderHistory.map((item) => (
                                                <LongCard
                                                    key={item["invoice"]["invoiceID"]}
                                                    userID={props.userID}
                                                    invoiceID={item["invoice"]["invoiceID"]}
                                                    isFavorite={item["invoice"]["isFavorite"]}
                                                    vendorName={item["vendor"]["profileName"]}
                                                    date={dateStringFormatTransform(item["invoice"]["date"])}
                                                    menuitems={ordersToMenuitemsList(item["orders"])}
                                                    price={item["invoice"]["totalPrice"]}
                                                    updateOrderHistoryTriggerFunction={setUpdateOrderHistoryTrigger}
                                                />
                                            ))
                                            : <Text>No order history</Text>
                                    )
                                    : <Text>Loading ...</Text>
                            }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>  
    )
}