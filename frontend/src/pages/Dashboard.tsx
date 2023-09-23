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
    Tr,
    UnorderedList
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FaBowlRice, FaStar } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import VendorDashboard from './VendorDashboard'
import { useEffect, useState } from "react"

function menuitems_dict_to_list(menuitems: any): string[] {
    var array = []
    for (var foodName in menuitems) {
        array.push(menuitems[foodName] + " x " + foodName)
    }
    return array
}

function favorite_icon(isFavorite: boolean) {
    if (isFavorite) {
        return <Icon as={FaStar} w={8} h={8} color={'gold'}/>
    } else {
        return <Icon as={FaRegStar} w={8} h={8}/>
    }
}

interface LongCardProps {
    isFavorite: ReactElement
    vendorName: string
    date: string
    menuitems: string[]
    price: number
}

const LongCard = ({ isFavorite, vendorName, date, menuitems, price }: LongCardProps) => {
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
                                <Button variant={'link'}>{isFavorite}</Button>
                            </Td>
                            <Td p={'16px'}>
                                <Heading size="lg">{vendorName}</Heading>
                                {date}
                                <br/><br/>
                                <Heading size="sm">Menu Items</Heading>
                                <UnorderedList>
                                    {menuitems.map((value) => (
                                        <ListItem>{value}</ListItem>
                                    ))}
                                </UnorderedList>
                            </Td>
                            <Td w={'150px'} p={'16px'} verticalAlign={'top'} textAlign={'right'}>
                                <Heading size="lg">${price.toFixed(2)}</Heading>
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

interface CommonDashboardProps {
    
}
 
const CommonDashboard = (props : CommonDashboardProps) => {
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
                        <LongCard
                            isFavorite={favorite_icon(true)}
                            vendorName={'ABC Food'}
                            date={'12 Sept 2023'}
                            menuitems={menuitems_dict_to_list({'Veggie': 1, 'Meat': 2})}
                            price={12.5}
                        />
                    </TabPanel>
                    <TabPanel>
                        <LongCard
                            isFavorite={favorite_icon(true)}
                            vendorName={'ABC Food'}
                            date={'12 Sept 2023'}
                            menuitems={menuitems_dict_to_list({'Veggie': 1, 'Meat': 2})}
                            price={12.5}
                        />
                        <LongCard
                            isFavorite={favorite_icon(false)}
                            vendorName={'XYZ Food'}
                            date={'10 Sept 2023'}
                            menuitems={menuitems_dict_to_list({'Veggie': 1, 'Meat': 2, 'Egg': 1})}
                            price={10}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    </Box>  
     )
}

interface DashboardProps {
    userRole : string
}

export default function Dashboard(props : DashboardProps) {
    const [role, setRole] = useState(props.userRole);

    // useEffect(() => {
    //   const fetchAccess =async () => {
    //     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login_user`);
    //     const result = await response.json();
    //     setRole(result.role);
    //   }
    
    //   fetchAccess();
    // }, [props.userRole])
    
    return (

            role !== 'vendor' ? <CommonDashboard></CommonDashboard> : <VendorDashboard></VendorDashboard> // for now until login and session is done
    );
}