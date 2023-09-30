"use client";

import {
  Box,
  Stack,
  Heading,
  Card,
  Container,
  CardBody,
  Icon,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  ListItem,
  Text,
  Divider,
  List,
  IconButton,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  AddIcon,
  CalendarIcon,
  LockIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import Error from "./Error";
import { FunctionComponent, useState } from "react";

const DataCard = ({
  id,
  icon,
  data,
  subtitle,
}: {
  id: string;
  icon: string;
  data: Number;
  subtitle: string;
}) => {
  const iconFactory = (iconType: string) => {
    switch (icon) {
      case "orders":
        return <CalendarIcon boxSize={"2rem"}></CalendarIcon>;
      case "cancelled":
        return <NotAllowedIcon boxSize={"2rem"}></NotAllowedIcon>;
      case "closed":
        return <LockIcon boxSize={"2rem"}></LockIcon>;
      default:
        return <Icon></Icon>;
    }
  };
  return (
    <Card id={id} size={"lg"} variant={"elevated"}>
      <CardBody>
        <Stack direction={"row"} align={"center"} gap={"1rem"}>
          <Box>{iconFactory(icon)}</Box>
          <Box w="30rem">
            <Stat>
              <StatLabel>{subtitle}</StatLabel>
              <StatNumber>{data.toString()}</StatNumber>
            </Stat>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

type MenuItem = {
  price: Number;
  menuItemImage: string;
  menuItemDesc: string;
};

const MenuItemRow = (props: MenuItem) => (
  <ListItem>
    <Stack direction={"row"} gap={"0.5rem"}>
      <Divider orientation="vertical" />
      <Text>{props.menuItemDesc}</Text>
      <Divider orientation="vertical" />
      <Text>$ {props.price.toFixed(2)}</Text>
    </Stack>
  </ListItem>
);

interface MenuListProps {
  items: MenuItem[];
}

const MenuList: FunctionComponent<MenuListProps> = (props) => {
  return (
    <List>
      {props.items.map((m) => {
        return (
          <MenuItemRow
            key={m.menuItemDesc}
            menuItemDesc={m.menuItemDesc}
            price={m.price}
            menuItemImage={m.menuItemImage}
          ></MenuItemRow>
        );
      })}
    </List>
  );
};

function MenuTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState<string>("");
  const [price, setprice] = useState<Number>(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      price: 12.0,
      menuItemImage: "url",
      menuItemDesc: "Char kway Teow",
    },
  ]);
  function onSubmit() {
    console.log("submit new item with " + description + " " + price.toFixed(2));
  }
  return (
    <>
      <Flex paddingBlock={"1rem"} align={"center"}>
        <Heading fontSize={"md"}>Menu Items</Heading>
        <IconButton
          aria-label="Add Item"
          marginLeft={"auto"}
          onClick={onOpen}
          icon={<AddIcon />}
        />
      </Flex>
      <MenuList items={menuItems}></MenuList>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Menu Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={"1rem"}>
              <FormControl id="name">
                <FormLabel>Name / Description</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setprice(Number(e.target.value))}
                  isRequired
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={"0.5rem"}>
          <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={onClose} variant='outline'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function VendorDashboard() {
  if (true)//sessionStorage.getItem("token"))

    return (
      <Container maxW="6xl">
        <Heading paddingBlock={"1.5rem"}>Dashboard</Heading>
        <Stack direction={"row"}>
          <DataCard
            id="orders"
            icon="orders"
            data={0}
            subtitle={"Total orders today"}
          ></DataCard>
          <DataCard
            id="cancelled"
            icon="cancelled"
            data={0}
            subtitle={"Cancelled orders today"}
          ></DataCard>
          <DataCard
            id="closed"
            icon="closed"
            data={0}
            subtitle={"Stalls closed today"}
          ></DataCard>
        </Stack>
        <Heading paddingBlock={"1rem"} fontSize={"1.5rem"}>
          Business Summary
        </Heading>
        <Stack direction={"row"}>
          <Card width={"50%"}>
            <CardHeader>
              <Heading size="md">Orders Report</Heading>
            </CardHeader>
            <CardBody>
              <Stack direction={"row"} spacing={"10rem"}>
                <Box>
                  <Stat>
                    <StatLabel>Total</StatLabel>
                    <StatNumber>100</StatNumber>
                  </Stat>
                </Box>
                <Box>
                  <Stat>
                    <StatLabel>Cancelled</StatLabel>
                    <StatNumber>12</StatNumber>
                  </Stat>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Card width={"50%"}>
            <CardHeader>
              <Heading size="md">Sales Report</Heading>
            </CardHeader>
            <CardBody>
              <Stack direction={"row"}>
                <Box>
                  <Stat>
                    <StatLabel>Sales</StatLabel>
                    <StatNumber>SGD $ 1,234.00</StatNumber>
                  </Stat>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Tabs paddingBlock={"2rem"}>
          <TabList>
            <Tab>Orders History</Tab>
            <Tab>Menu</Tab>
            <Tab>Opening Times</Tab>
            <Tab>Ratings and reviews</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <MenuTab></MenuTab>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>Four</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    );
  return <Error></Error>;
}
