"use client";

import {
  Box,
  Stack,
  Heading,
  Card,
  Container,
  CardBody,
  Center,
  Checkbox,
  Icon,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
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
import { FunctionComponent, useState, useEffect } from "react";
import OrderStatusBadge from "../components/OrderStatusBadge";

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
  const iconFactory = (iconType:string) => {
    switch (iconType) {
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

interface MenuListProps {
  items: MenuItem[];
  onEditMenuItem: (menuItem: MenuItem) => void;
  onDeleteMenuItem: (menuItemId: Number) => void;
}

const MenuList: FunctionComponent<MenuListProps> = (props) => {
  return (
    <>
      <TableContainer>
        <Table variant="striped">
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
              return m.isValid === true ? (
                <Tr key={m.menuItemID.toString() + m.menuItemName}>
                  <Td>{m.menuItemName}</Td>
                  <Td>{m.menuItemDesc === null ? "NA" : m.menuItemDesc}</Td>
                  <Td isNumeric>${m.price.toFixed(2)}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit Menu Item"
                      icon={<ViewIcon />}
                      onClick={() => {
                        props.onEditMenuItem(m);
                      }}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Delete item"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        props.onDeleteMenuItem(m.menuItemID);
                      }}
                    />
                  </Td>
                </Tr>
              ) : null;
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

interface TabProps {
  userID: Number;
  profileID: Number;
}

function MenuTab(props: TabProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<Number>(0);
  let url = `${import.meta.env.VITE_API_BASE_URL}/menu_items/get/${
    props.userID
  }`;
  const createUrl = `${import.meta.env.VITE_API_BASE_URL}/menu_items/create`;
  const editUrl = `${import.meta.env.VITE_API_BASE_URL}/menu_items/update`;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  function handleEditMenuItem(menuItem: MenuItem) {
    setSelectedMenuItem(menuItem);
    onOpen(); // Open the modal
  }

  async function handleDeleteMenuItem(menuItemID: Number) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/menu_items/delete/?menu_item_id=${menuItemID}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        // Remove the deleted item from the menuItems state
        setMenuItems(
          menuItems.filter((item) => item.menuItemID !== menuItemID)
        );
      } else {
        console.error("Failed to delete menu item.");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const newData = await response.json();
      setMenuItems(newData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMenuItem) {
      setItemName(selectedMenuItem.menuItemName || "");
      setDescription(selectedMenuItem.menuItemDesc || "");
      setImageUrl(selectedMenuItem.menuItemImage || "");
      setPrice(selectedMenuItem.price || 0);
    } else {
      // If there is no selectedMenuItem, reset the fields
      setItemName("");
      setDescription("");
      setImageUrl("");
      setPrice(0);
    }
  }, [selectedMenuItem]);

  async function onSubmit() {
    const itemToAdd = {
      menuItemID: 1, // temp id
      menuItemName: itemName,
      price: price,
      menuItemImage: imageUrl,
      menuItemDesc: description,
      isValid: true,
      vendorProfileID: props.profileID,
    };
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        body: JSON.stringify(itemToAdd),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        const newItem = await response.json();
        itemToAdd.menuItemID = newItem.id;
        setMenuItems([...menuItems, itemToAdd]);

        // Reset form fields
        setItemName("");
        setPrice(0);
        setImageUrl("");
        setDescription("");
      } else {
        console.error("Failed to create a new menu item.");
      }
    } catch (error) {
      console.error("Error creating a new menu item:", error);
    }
    onClose();
    setSelectedMenuItem(null);
  }

  async function onEdit() {
    const itemToedit = {
      menuItemID: selectedMenuItem!.menuItemID, // temp id
      menuItemName: itemName,
      price: price,
      menuItemImage: imageUrl,
      menuItemDesc: description,
      isValid: true,
      vendorProfileID: props.profileID,
    };
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        body: JSON.stringify(itemToedit),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        const newItem = await response.json();

        setMenuItems((prevMenuItems) =>
          prevMenuItems.map((menuItem) =>
            menuItem.menuItemID === selectedMenuItem!.menuItemID
              ? { ...menuItem, ...itemToedit, menuItemID: newItem.id }
              : menuItem
          )
        );

        // Reset form fields
        setItemName("");
        setPrice(0);
        setImageUrl("");
        setDescription("");
      } else {
        console.error("Failed to edit menu item.");
      }
    } catch (error) {
      console.error("Error editing menu item:", error);
    }
    onClose();
    setSelectedMenuItem(null);
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
      <MenuList
        items={menuItems}
        onEditMenuItem={handleEditMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
      ></MenuList>
      <Modal
        onClose={() => {
          setSelectedMenuItem(null);
          onClose();
        }}
        isOpen={isOpen}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedMenuItem ? "Edit Menu Item" : "Create a new Menu Item"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={"1rem"}>
              <FormControl id="name">
                <FormLabel>Name / Description</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setItemName(e.target.value)}
                  isRequired
                  defaultValue={
                    selectedMenuItem ? selectedMenuItem.menuItemName : ""
                  }
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  isRequired
                  defaultValue={
                    selectedMenuItem ? selectedMenuItem.menuItemDesc || "" : ""
                  }
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setPrice(Number(e.target.value))}
                  isRequired
                  defaultValue={
                    selectedMenuItem
                      ? selectedMenuItem.price.toFixed(2)
                      : "0.00"
                  }
                />
              </FormControl>
              <FormControl id="imageUrl">
                <FormLabel>Image Url</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setImageUrl(e.target.value)}
                  isRequired
                  defaultValue={
                    selectedMenuItem ? selectedMenuItem.menuItemImage || "" : ""
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={"0.5rem"}>
            <Button onClick={() => (selectedMenuItem ? onEdit() : onSubmit())}>
              {selectedMenuItem ? "Edit" : "Submit"}
            </Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

interface Promotion {
  promotionID: Number;
  promoCode: string;
  discount: Number;
  discountType: String;
  minimumSpending: Number;
  isValid: Boolean;
  vendorProfileID: Number;
}

function PromotionTab(props: TabProps) {
  const [discount, setDiscount] = useState<Number>(0);
  const [discountType, setDiscountType] = useState<string>("discount");
  const [minimumSpending, setMinimumSpending] = useState<Number>(0);
  const [promoCode, setPromoCode] = useState<string>("");
  let url = `${import.meta.env.VITE_API_BASE_URL}/vendor/promotion/get/${
    props.userID
  }`;
  const createUrl = `${import.meta.env.VITE_API_BASE_URL}/promotion/create`;
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const newData = await response.json();
      console.log(newData);
      setPromotions(newData);
    };

    fetchData();
  }, []);

  async function submitPromo() {
    const itemToAdd = {
      promotionID: 1, // temp id
      promoCode: promoCode,
      discount: discountType === 'ONEFORONE' ? 50 : discount,
      discountType: discountType,
      minimumSpending: minimumSpending,
      isValid: true,
      vendorProfileID: props.profileID,
    };
    console.log(discountType);
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        body: JSON.stringify(itemToAdd),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        const newItem = await response.json();
        itemToAdd.promotionID = newItem.id;

        setPromotions([...promotions, itemToAdd]);
        
      } else {
        console.error("Failed to create promotion.");
      }
    } catch (error) {
      console.error("Error creating a new promotion:", error);
    }
  }

  async function onDeletePromo(promoID: Number) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/promotion/delete/?promotion_id=${promoID}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        // Remove the deleted item from the menuItems state
        setPromotions(
          promotions.filter((item) => item.promotionID !== promoID)
        );
      } else {
        console.error("Failed to delete menu item.");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  }

  return (
    <>
      <Stack paddingBlock={"1rem"} align={"left"} direction={"column"}>
        <Heading fontSize={"md"}>Create New Promotion</Heading>
        <Stack direction={"row"}>
          <FormControl>
            <FormLabel>Discount Type</FormLabel>
            <Select
              onChange={(e) => setDiscountType(e.target.value)}
              isRequired
            >
              <option value="DISCOUNT" selected>Discount</option>
              <option value="ONEFORONE">One-for-one</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Discount (%)</FormLabel>
            <Input
              onChange={(e) => setDiscount(Number(e.target.value))}
              isRequired
              placeholder="Set discount in % off"
              type={"number"}
              defaultValue={discount.toFixed(2)}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Minumum Spend ($)</FormLabel>
            <Input
              onChange={(e) => setMinimumSpending(Number(e.target.value))}
              isRequired
              placeholder="Set min. spend in dollars ($)"
              type={"number"}
              defaultValue={minimumSpending.toFixed(2)}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Promo Code</FormLabel>
            <Input
              onChange={(e) => setPromoCode(e.target.value)}
              isRequired
              placeholder="Set promo code"
              minLength={5}
              maxLength={8}
              type={"text"}
              defaultValue={""}
            ></Input>
          </FormControl>
          <IconButton
            aria-label="Add Item"
            marginLeft={"auto"}
            marginTop={"auto"}
            icon={<AddIcon />}
            onClick={() => submitPromo()}
          />
        </Stack>
        <Heading fontSize={"md"} paddingTop={"1rem"}>Active Promotions</Heading>
        <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Promo Code</Th>
              <Th width={"50%"}>Discount Type</Th>
              <Th width={"5%"} isNumeric>
              discount
              </Th>
              <Th width={"5%"} isNumeric>
              Min. Spending
              </Th>
              <Th width={"10%"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {promotions.map((m) => {
              return m.isValid === true ? (
                <Tr key={m.promotionID.toString() + m.promoCode}>
                  <Td>{m.promoCode}</Td>
                  <Td>{m.discountType}</Td>
                  <Td isNumeric>{m.discount.toFixed(2)}%</Td>
                  <Td>{m.minimumSpending === 0 ? "NA" : m.minimumSpending.toFixed(2)}</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete item"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        onDeletePromo(m.promotionID);
                      }}
                    />
                  </Td>
                </Tr>
              ) : null;
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      </Stack>
    </>
  );
}

interface Invoice {
  totalPrice: number;
  status: string;
  invoiceID: number;
  isFavorite: boolean;
  vendorProfileID: number;
  discount: number;
  date: string;
  customerProfileID: number;
}

interface Order {
  price: number;
  quantity: number;
  menuItemID: number;
  orderID: number;
  foodName: string;
  invoiceID: number;
}

interface InvoiceData {
  invoice: Invoice;
  orders: Order[];
}

function InvoiceTable(data: InvoiceData[]) {
  return (
    <TableContainer paddingBottom={"2rem"}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th width={"5rem"}>Invoice No.</Th>
            <Th width={"5rem"}>Date</Th>
            <Th width={"80rem"}>Orders</Th>
            <Th isNumeric>Quantity</Th>
            <Th width={"7rem"}>Status</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((o) => {
            return (
              <Tr key={o.invoice.invoiceID}>
                <Td>{o.invoice.invoiceID}</Td>
                <Td>{o.invoice.date}</Td>
                <Td>{o.orders.map((m) => m.foodName).join(", ")}</Td>
                <Td isNumeric>{o.orders.length}</Td>
                <Td>
                  <OrderStatusBadge type={o.invoice.status}></OrderStatusBadge>
                </Td>
                <Td isNumeric>${o.invoice.totalPrice.toFixed(2)}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
}

function OrdersTab(props: TabProps) {
  let url = `${import.meta.env.VITE_API_BASE_URL}/vendor/orders/get/${
    props.userID
  }`;
  const [orders, setOrders] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const newData = await response.json();
      setOrders(newData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Flex paddingBlock={"1rem"} align={"center"}>
        <Heading fontSize={"md"}>Pending</Heading>
      </Flex>
      {InvoiceTable(
        orders.filter((o) => o.invoice.status.toLowerCase() === "pending")
      )}
      <Flex paddingBlock={"1rem"} align={"center"}>
        <Heading fontSize={"md"}>Completed Orders</Heading>
      </Flex>
      {InvoiceTable(
        orders.filter((o) => o.invoice.status.toLowerCase() === "done")
      )}
    </>
  );
}

interface OpeningTime {
  openTime: string;
  vendorProfileID: Number;
  isOpen: Boolean;
  day: Number; // between 1 to 7
  openingHoursID: Number;
  closingtTime: string;
}

function OpeningTimesTab(props: TabProps) {
  let getUrl = `${import.meta.env.VITE_API_BASE_URL}/opening_hours/get/${
    props.userID
  }`;
  let postUrl = `${import.meta.env.VITE_API_BASE_URL}/opening_hours/update/`;
  const [openingTimes, setOpeningTimes] = useState<OpeningTime[]>([]);

  const days: readonly string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getUrl);
      const newData = await response.json();
      setOpeningTimes([...newData]);
    };

    fetchData();
  }, []);

  function handleCheckboxChange(index: number) {
    const updatedOpeningTimes = [...openingTimes];
    updatedOpeningTimes[index].isOpen = !updatedOpeningTimes[index].isOpen;
    setOpeningTimes(updatedOpeningTimes);
    console.log(updatedOpeningTimes);
  }

  function handleStartTimeChange(index: number, startTime: string) {
    // Create a new date object with the same date and the new start time
    const currentDate = new Date(); // Use the date from the existing openingTime
    const timeParts = startTime.split(":");
    currentDate.setUTCHours(Number(timeParts[0]), Number(timeParts[1]), 0, 0);

    // Update the openingTimes state
    const updatedOpeningTimes = [...openingTimes];
    updatedOpeningTimes[index].openTime = currentDate.toISOString();
    setOpeningTimes(updatedOpeningTimes);
    console.log(updatedOpeningTimes);
  }

  function handleEndTimeChange(index: number, endTime: string) {
    const currentDate = new Date(); // Use the date from the existing openingTime
    const timeParts = endTime.split(":");
    currentDate.setUTCHours(Number(timeParts[0]), Number(timeParts[1]), 0, 0);

    // Update the openingTimes state
    const updatedOpeningTimes = [...openingTimes];
    updatedOpeningTimes[index].closingtTime = currentDate.toISOString();
    setOpeningTimes(updatedOpeningTimes);
    console.log(updatedOpeningTimes);
  }

  function onSave() {
    const updateOpeningHours = async () => {
      const response = await fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(openingTimes),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
      } else {
        console.error("Failed to update opening hours.");
      }
    };

    updateOpeningHours();
  }

  return (
    <>
      <Heading fontSize={"md"} paddingBlock={"1rem"}>
        Set your opening hours
      </Heading>
      <Box id={"openingTimeTabBox"}>
        {openingTimes?.map((t, index) => {
          return (
            <Flex
              direction={"row"}
              key={t.openingHoursID.toString() + t.day.toString()}
              paddingBottom={"1rem"}
            >
              <Center gap={"2rem"}>
                <Checkbox
                  width={"10rem"}
                  defaultChecked={t.isOpen ? true : false}
                  onChange={() => handleCheckboxChange(index)}
                >
                  {days[(t.day as number) - 1]}
                </Checkbox>
                <Text fontSize="md" fontWeight={"semibold"}>
                  Start Time
                </Text>
                <Input
                  placeholder="Select Start Time"
                  size="md"
                  type="time"
                  width={"15rem"}
                  defaultValue={
                    new Date(t.openTime).toTimeString().split(" ")[0]
                  }
                  onChange={(e) => handleStartTimeChange(index, e.target.value)}
                />
                <Text fontSize="md" fontWeight={"semibold"}>
                  End Time
                </Text>
                <Input
                  placeholder="Select End Time"
                  size="md"
                  type="time"
                  width={"15rem"}
                  defaultValue={
                    new Date(t.closingtTime).toTimeString().split(" ")[0]
                  }
                  onChange={(e) => handleEndTimeChange(index, e.target.value)}
                />
              </Center>
            </Flex>
          );
        })}
      </Box>
      <Button aria-label="save" onClick={onSave}>
        Save
      </Button>
    </>
  );
}

interface VendorProfile {
  address: string;
  email: string;
  phone: string;
  profileName: string;
  shopDesc: string | null;
  status: Boolean;
  userID: Number;
  vendorProfileID: Number;
}

interface VendorDashboardProps {
  userID: number;
}

export default function VendorDashboard(props: VendorDashboardProps) {
  const vendorPofileUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/vendor_profile/get/${props.userID}`;
  const [vendorProfileId, setVendorProfileId] = useState<Number>(0);

  let ordersUrl = `${import.meta.env.VITE_API_BASE_URL}/vendor/orders/get/${
    props.userID
  }`;
  const [orders, setOrders] = useState<InvoiceData[]>([]);

  const currentMonth = new Date().getUTCMonth() + 1;
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(vendorPofileUrl);
      const newData: VendorProfile = await response.json();
      setVendorProfileId(newData.vendorProfileID);
    };

    const fetchOrders = async () => {
      const response = await fetch(ordersUrl);
      const newData = await response.json();
      const currentMonthInvoices = newData.filter(
        (invoiceData: InvoiceData) => {
          const invoiceDate = new Date(invoiceData.invoice.date);
          const invoiceMonth = invoiceDate.getMonth() + 1; // Adding 1 to get 1-based index
          return invoiceMonth === currentMonth;
        }
      );
      setOrders([...currentMonthInvoices]);
    };

    fetchProfile();
    fetchOrders();
  }, []);

  return (
    <Container maxW="6xl">
      <Heading paddingBlock={"1.5rem"}>Dashboard</Heading>
      <Stack direction={"row"}>
        <DataCard
          id="orders"
          icon="orders"
          data={
            orders.filter(
              (invoiceData) => invoiceData.invoice.date === currentDate
            ).length
          }
          subtitle={"Total orders today"}
        ></DataCard>
        <DataCard
          id="cancelled"
          icon="cancelled"
          data={
            orders.filter(
              (invoiceData) =>
                invoiceData.invoice.date === currentDate &&
                invoiceData.invoice.status === "CANCELLED"
            ).length
          }
          subtitle={"Cancelled orders today"}
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
                  <StatNumber>{orders.length}</StatNumber>
                </Stat>
              </Box>
              <Box>
                <Stat>
                  <StatLabel>Cancelled</StatLabel>
                  <StatNumber>
                    {
                      orders.filter(
                        (invoiceData) =>
                          invoiceData.invoice.status === "CANCELLED"
                      ).length
                    }
                  </StatNumber>
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
                  <StatNumber>
                    SGD $
                    {orders
                      .filter(
                        (invoiceData) => invoiceData.invoice.status === "DONE"
                      )
                      .reduce(
                        (total, invoiceData) =>
                          total +
                          invoiceData.invoice.totalPrice -
                          invoiceData.invoice.discount,
                        0
                      )
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </StatNumber>
                </Stat>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
      <Tabs paddingBlock={"2rem"}>
        <TabList>
          <Tab>All Orders</Tab>
          <Tab>Menu</Tab>
          <Tab>Opening Hours</Tab>
          <Tab>Promotion Manager</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OrdersTab
              userID={props.userID}
              profileID={vendorProfileId}
            ></OrdersTab>
          </TabPanel>
          <TabPanel>
            <MenuTab
              userID={props.userID}
              profileID={vendorProfileId}
            ></MenuTab>
          </TabPanel>
          <TabPanel>
            <OpeningTimesTab
              userID={props.userID}
              profileID={vendorProfileId}
            ></OpeningTimesTab>
          </TabPanel>
          <TabPanel>
            <PromotionTab
              userID={props.userID}
              profileID={vendorProfileId}
            ></PromotionTab>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
