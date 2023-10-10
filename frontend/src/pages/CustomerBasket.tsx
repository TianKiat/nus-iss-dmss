import { Box, Button, Container, Flex, Heading, Icon, ListItem, Table, TableContainer, Tbody, Td, Tr, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md"

function ordersToMenuitemsList(orders: any[]): string[] {
    var menuitems = []
    for (var i = 0; i < orders.length; i++) {
        menuitems.push(orders[i]["quantity"] + " x " + orders[i]["foodName"])
    }
    return menuitems
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

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            p={3}>
            <TableContainer>
                <Table variant='unstyled'>
                    <Tbody>
                        <Tr>
                            <Td w={'100px'} p={'16px'} verticalAlign={'top'}>
                                <Button
                                    colorScheme="red"
                                    variant="ghost"
                                    size="lg"
                                    p={2}
                                    onClick={deleteInvoice}>
                                    <Icon as={MdDelete} />
                                </Button>
                                <Button
                                    colorScheme="yellow"
                                    variant="ghost"
                                    size="lg"
                                    p={2}>
                                    <Icon as={MdEdit} />
                                </Button>
                            </Td>
                            <Td p={'16px'}>
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
                    {orderBasket.map((item) => (
                        <OrderCard
                            key={item["invoice"]["invoiceID"]}
                            userID={props.userID}
                            invoiceID={item["invoice"]["invoiceID"]}
                            vendorName={item["vendor"]["profileName"]}
                            date={item["invoice"]["date"]}
                            menuitems={item["orders"]}
                            price={item["invoice"]["totalPrice"]}
                            setUpdateOrderBasketTriggerFunction={setUpdateOrderBasketTrigger}/>
                    ))}
                </Flex>
            </Container>
        </Box>
    )
}