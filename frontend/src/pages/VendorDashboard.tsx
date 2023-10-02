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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
  DeleteIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import Error from "./Error";
import { FunctionComponent, useState, useEffect } from "react";
import { useFetch } from "../useFetch";
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

interface MenuItem {
  menuItemID: Number;
  menuItemName: string;
  price: Number;
  menuItemImage: string;
  menuItemDesc: string;
  isValid: boolean;
  vendorProfileID: Number;
}

const MenuItemRow = (props: MenuItem) => (
  <Tr>
    <Td>{props.menuItemName}</Td>
    <Td>{props.menuItemDesc === null ? "NA" : props.menuItemDesc}</Td>
    <Td isNumeric>${props.price.toFixed(2)}</Td>
    <Td>
      <IconButton aria-label="Edit Menu Item" icon={<ViewIcon />} />
    </Td>
    <Td>
      <IconButton aria-label="Search database" icon={<DeleteIcon />} />
    </Td>
  </Tr>
);

interface MenuListProps {
  items: MenuItem[];
}

const MenuList: FunctionComponent<MenuListProps> = (props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [description, setDescription] = useState<string>("");
  // const [itemName, setItemName] = useState<string>("");
  // const [imageUrl, setImageUrl] = useState<string>("");
  // const [price, setprice] = useState<Number>(0);
  // const user_id = 1;
  // const postUrl = `${import.meta.env.VITE_API_BASE_URL}/menu_items/update/`;

  // function onEdit() {
  //   let itemToAdd: MenuItem = {
  //     menuItemID: 1, // temp id
  //     menuItemName: itemName,
  //     price: price,
  //     menuItemImage: imageUrl,
  //     menuItemDesc: description,
  //     isValid: true,
  //     vendorProfileID: user_id,
  //   };
  //   console.log(itemToAdd);
  //   fetch(postUrl, {
  //     // Adding method type
  //     method: "POST",

  //     // Adding body or contents to send
  //     body: JSON.stringify(itemToAdd),

  //     // Adding headers to the request
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     // Converting to JSON
  //     .then((response) => response.json())

  //     // Displaying results to console
  //     .then((json) => {
  //       console.log(json);
  //       onClose();
  //     });
  // }

  // function onEditClick(item: MenuItem) {
  //   setItemName(item.menuItemName);
  //   setDescription(item.menuItemDesc);
  //   setprice(item.price);
  //   setImageUrl(item.menuItemImage);
  //   onOpen();
  // }

  return (
    <>
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th width={"50%"}>Description</Th>
            <Th width={"5%"} isNumeric>
              Price
            </Th>
            <Th width={"10%"}></Th>
            <Th width={"10%"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.items.map((m) => {
            return (
              <Tr>
                <Td>{m.menuItemName}</Td>
                <Td>{m.menuItemDesc === null ? "NA" : m.menuItemDesc}</Td>
                <Td isNumeric>${m.price.toFixed(2)}</Td>
                <Td>
                  <IconButton aria-label="Edit Menu Item" icon={<ViewIcon />} />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Delete item"
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
    {/* <Modal onClose={onclose} isOpen={isOpen} isCentered size={"xl"}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit Menu Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={"1rem"}>
          <FormControl id="name">
            <FormLabel>Name / Description</FormLabel>
            <Input
              type="text"
              onChange={(e) => setItemName(e.target.value)}
              isRequired
              value={itemName}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              isRequired
              value={description}
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <Input
              type="text"
              onChange={(e) => setprice(Number(e.target.value))}
              isRequired
              value={price.toString()}
            />
          </FormControl>
          <FormControl id="imageUrl">
            <FormLabel>Image Url</FormLabel>
            <Input
              type="text"
              onChange={(e) => setImageUrl(e.target.value)}
              isRequired
              value={imageUrl}
            />
          </FormControl>
        </Stack>
      </ModalBody>
      <ModalFooter gap={"0.5rem"}>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal> */}
  </>
  );
};

function MenuTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setprice] = useState<Number>(0);
  const user_id = 1;
  let url = `${import.meta.env.VITE_API_BASE_URL}/menu_items/get/${user_id}`;
  const postUrl = `${import.meta.env.VITE_API_BASE_URL}/menu_items/create/`;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const newData = await response.json();
      setMenuItems(newData);
    };

    fetchData();
  }, []);

  function onSubmit() {
    let itemToAdd: MenuItem = {
      menuItemID: 1, // temp id
      menuItemName: itemName,
      price: price,
      menuItemImage: imageUrl,
      menuItemDesc: description,
      isValid: true,
      vendorProfileID: user_id,
    };
    console.log(itemToAdd);
    fetch(postUrl, {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify(itemToAdd),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => {
        console.log(json.id);
        onClose();
        itemToAdd.menuItemID = json.id
        setMenuItems([...menuItems, itemToAdd]);
      });
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
                  onChange={(e) => setItemName(e.target.value)}
                  isRequired
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
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
              <FormControl id="imageUrl">
                <FormLabel>Image Url</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setImageUrl(e.target.value)}
                  isRequired
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={"0.5rem"}>
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  );
}

export default function VendorDashboard() {
  if (true)
    //sessionStorage.getItem("token"))

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
