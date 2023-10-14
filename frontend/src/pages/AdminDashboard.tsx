'use client'

import {
    Box,
    Container,
    Flex,
    Heading,
    Stack,
    Card,
    CardHeader,
    CardBody,
    StatLabel,
    StatNumber,
    Stat,

} from '@chakra-ui/react'

import { ReactElement, useEffect, useState } from 'react'

interface ComplaintCardProps {
    id: string
    title: string
    description:string

}

const ComplaintCard = ({ id, title, description }: CardProps) => {
    return (
        <Container id = {id} maxW="6xl" borderStyle={'outset'}>
        <Heading paddingBlock={"1.5rem"} size={'md'}>{title}</Heading>
        <p>{description}</p>
        </Container>
    )
}

interface AdminDashboardProps {
    userID: number
}



export default function (props : AdminDashboardProps) {

    return ( 
        <Container maxW="6xl">
            <Heading paddingBlock={"1.5rem"}>Admin Dashboard</Heading>

            <Heading paddingBlock={"1.5rem"}>Complaints</Heading>
            <Stack direction={"row"}>
                <Card width = {"50%"}>
                    <CardHeader>
                        <Heading>Number of Complaints</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box>
                            <Stat>
                                <StatLabel>Current Complaints</StatLabel>
                                <StatNumber>3</StatNumber>
                            </Stat>
                        </Box>
                    </CardBody>
                </Card>
                <Card width = {"50%"}>
                    <CardHeader>
                        <Heading>New Complaints Today</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box>
                            <Stat>
                                <StatLabel>New Complaints</StatLabel>
                                <StatNumber>3</StatNumber>
                            </Stat>
                        </Box>
                    </CardBody>
                </Card>
            </Stack>
            <Heading paddingBlock={"1rem"} fontSize={"1.5rem"}>Complaints</Heading>
            <Stack direction={"column"}>
                <ComplaintCard
                    id={'1'}
                    title = {"testing"}
                    description={"test"}
                />
                <ComplaintCard
                    id={'2'}
                    title = {"testing"}
                    description={"test"}
                />
                <ComplaintCard
                    id={'3'}
                    title = {"testing"}
                    description={"test"}
                />
            </Stack>
        </Container>
        
    )
}