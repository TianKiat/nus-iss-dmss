import { Box, Button, Container, Flex, Heading, Icon, ListItem, Table, TableContainer, Tbody, Td, Tr, UnorderedList } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md"

interface OrderCardProps {
    userID: number,
    invoiceID: number,
    vendorName: string,
    date: string,
    menuitems: string[],
    price: number
}

const OrderCard = (props: OrderCardProps) => {
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
                                <Button colorScheme="red" variant="ghost" size="lg" p={2}>
                                    <Icon as={MdDelete} />
                                </Button>
                                <Button colorScheme="yellow" variant="ghost" size="lg" p={2}>
                                    <Icon as={MdEdit} />
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

interface CustomerBasketProps {

}

export default function (props: CustomerBasketProps) {
    return (
        <Box p={4}>
            <Container maxW={'5xl'} mt={12}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Basket
                </Heading>
                <br/>
                <Flex gap="1rem" flexDirection="column">
                    <OrderCard
                        userID={1}
                        invoiceID={1}
                        vendorName="Vendor Name"
                        date="Date"
                        menuitems={["quantity x menuitem"]}
                        price={10}/>
                    <OrderCard
                        userID={1}
                        invoiceID={1}
                        vendorName="Vendor Name"
                        date="Date"
                        menuitems={["quantity x menuitem"]}
                        price={10}/>
                </Flex>
            </Container>
        </Box>
    )
}