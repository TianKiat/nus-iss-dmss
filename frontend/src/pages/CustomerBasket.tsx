import { Box, Button, Container, Flex, Heading, Icon, Input, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAdd, MdCancel, MdCheckCircle, MdClose, MdDelete, MdRemove, MdStore } from "react-icons/md"
import { useNavigate } from "react-router-dom";

const verifyPromoCodeResult = (promoCode: any, totalPrice: number) => {
    if (promoCode != null) {
        if (promoCode["promoCode"] != null) {
            if (promoCode["minimumSpending"] <= totalPrice) {
                return (
                    <Flex gap="0.5rem" alignItems="center">
                        <Icon as={MdCheckCircle} color="green" fontSize="xl"/>
                        <Text color="green">Valid</Text>
                    </Flex>
                )
            } else {
                return (
                    <Flex gap="0.5rem" alignItems="center">
                        <Icon as={MdCancel} color="red" fontSize="xl"/>
                        <Text color="red">Must be at least ${promoCode["minimumSpending"].toFixed(2)}</Text>
                    </Flex>
                )
            }
        } else {
            return (
                <Flex gap="0.5rem" alignItems="center">
                    <Icon as={MdCancel} color="red" fontSize="xl"/>
                    <Text color="red">Invalid</Text>
                </Flex>
            )
        }
    } else {
        return null
    }
}

interface PlaceOrderPopupProps {
    invoiceID: number,
    vendorName: string,
    menuitems: any[],
    price: number,
    setPlaceOrderPopupFunction: Function
}

const PlaceOrderPopup = (props: PlaceOrderPopupProps) => {
    const [promoCodeInput, setPromoCodeInput]: any = useState();
    const [promoCode, setPromoCode]: any = useState();
    const navigate = useNavigate();

    const verifyPromoCode = (event: any) => {
        event.preventDefault();
        
        const fetchAccess = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/promotion/get/${promoCodeInput}`);
            const result = await response.json();
            setPromoCode(result == null ? {"promoCode": null} : result);
        }

        fetchAccess();
    }

    const placeOrder = async() => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/invoice/status_discount/update`, {
            method: 'POST',
            body: JSON.stringify({
                invoiceID: props.invoiceID,
                status: "PENDING",
                discount: promoCode != null && promoCode["minimumSpending"] <= props.price ? promoCode["discount"] : 0
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();

        if (result != null) {
            navigate("/");
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
            <Container maxW="xl" p={5} bgColor="white">
                <Button
                    colorScheme="red"
                    p={0}
                    float="right"
                    onClick={() => {props.setPlaceOrderPopupFunction(null)}}>
                    <Icon as={MdClose}/>
                </Button>
                <Box mt="48px">
                    <Heading mb={{base: "0.5rem", md: "1rem"}} size="lg">Orders - {props.vendorName}</Heading>
                    <Box mb={{base: "1rem", md: "2rem"}} pl={{base: "1rem", sm: "3rem"}}>
                        <UnorderedList ml="0px" mb="1rem">
                            {props.menuitems.map((item) => (
                                <ListItem key={item["menuItemID"]} display="flex">
                                    <Text w="250px">{item["foodName"]}</Text>
                                    <Text w="50px">X {item["quantity"]}</Text>
                                    <Text w="100px" textAlign="right">${item["price"].toFixed(2)}</Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                        <Flex>
                            <Heading size="sm" w="300px">Sub-total</Heading>
                            <Heading size="sm" w="100px" textAlign="right">${props.price.toFixed(2)}</Heading>
                        </Flex>
                    </Box>
                    <Heading mb={{base: "0.5rem", md: "1rem"}} size="lg">Discounts</Heading>
                    <form onSubmit={verifyPromoCode}>
                        <Flex
                            flexWrap="wrap"
                            gap="1rem"
                            alignItems="center"
                            mb={{base: "1rem", md: "2rem"}}
                            pl={{base: "1rem", sm: "3rem"}}>
                            <Input
                                placeholder="Promotion Code"
                                w="175px"
                                onChange={(e) => {
                                    setPromoCodeInput(e.currentTarget.value);
                                    setPromoCode(null);
                                }}/>
                            <Button type="submit" colorScheme="blue">Verify</Button>
                            {verifyPromoCodeResult(promoCode, props.price)}
                        </Flex>
                    </form>
                    <Heading mb={{base: "0.5rem", md: "1rem"}} size="lg">Total Payment</Heading>
                    <Box mb={{base: "1.5rem", md: "3rem"}} pl={{base: "1rem", sm: "3rem"}}>
                        <Flex>
                            <Text w="100px">Sub-total</Text>
                            <Text w="100px" textAlign="right">${props.price.toFixed(2)}</Text>
                        </Flex>
                        <Flex>
                            <Text w="100px">Discount</Text>
                            <Text w="100px" textAlign="right">-${
                                promoCode != null && promoCode["minimumSpending"] <= props.price ? 
                                    promoCode["discount"].toFixed(2)
                                    : Number(0).toFixed(2)
                            }</Text>
                        </Flex>
                        <Flex>
                            <Text w="100px" fontWeight="bold">Total</Text>
                            <Text w="100px" fontWeight="bold" textAlign="right">${
                                promoCode != null && promoCode["minimumSpending"] <= props.price ? 
                                    Number(props.price - promoCode["discount"]).toFixed(2)
                                    : props.price.toFixed(2)
                            }</Text>
                        </Flex>
                    </Box>
                    <Button
                        colorScheme="green"
                        w="full"
                        onClick={placeOrder}>
                        Place Order
                    </Button>
                </Box>
            </Container>
        </Box>
    )
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
    vendorProfileID: number,
    vendorName: string,
    date: string,
    menuitems: any[],
    price: number,
    setUpdateOrderBasketTriggerFunction: Function
}

const OrderCard = (props: OrderCardProps) => {
    const [placeOrderPopup, setPlaceOrderPopup]: any = useState();

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

    const placeOrderPopupTag = (
        <PlaceOrderPopup
            invoiceID={props.invoiceID}
            vendorName={props.vendorName}
            menuitems={props.menuitems}
            price={props.price}
            setPlaceOrderPopupFunction={setPlaceOrderPopup}/>
    );

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
                        leftIcon={<MdStore/>}
                        onClick={() => {setPlaceOrderPopup(placeOrderPopupTag)}}>
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
            {placeOrderPopup}
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