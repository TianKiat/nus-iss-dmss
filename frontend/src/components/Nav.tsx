"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import {
  FaHamburger, FaShoppingBasket, FaUserCircle
} from 'react-icons/fa'

import { Link } from "react-router-dom";

function navButtons(userID: number, username: string, userRole: string) {
  if (userID != null) {
    return (
      <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
        {userRole == "customer" ?
          <Link to={"/basket"}>
            <Button
              as={"a"}
              p={2}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              _hover={{textDecoration: "none", color: "black"}}>
              <Icon as={FaShoppingBasket} w={5} h={5} marginRight={2}/>
              <Text size={'sm'} fontWeight={600} alignSelf={'center'} whiteSpace={'nowrap'}>
                Basket
              </Text>
            </Button>
          </Link>
          : null
        }
        <Link to={"./profile"}>
          <Button
            as={"a"}
            p={2}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            _hover={{textDecoration: "none", color: "black"}}>
            <Icon as={FaUserCircle} w={5} h={5} marginRight={2}/>
            <Text size={'sm'} fontWeight={600} alignSelf={'center'} whiteSpace={'nowrap'}>
              {username}
            </Text>
          </Button>
        </Link>
        <Button as={"a"} display={{ base: "none", md: "inline-flex" }} fontSize={"sm"}
                fontWeight={600} color={"white"} bg={"blue.400"} href={"/login"}
                _hover={{ bg: "blue.300" }}>
          Sign Out
        </Button>
      </Stack>);
  } else {
    return (
      <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
        <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"/login"}>
          Sign In
        </Button>
        <Button as={"a"} display={{ base: "none", md: "inline-flex" }} fontSize={"sm"}
                fontWeight={600} color={"white"} bg={"blue.400"} href={"register"}
                _hover={{ bg: "blue.300" }}>
          Sign Up
        </Button>
      </Stack>
    )
  }
}

interface NavProps {
  userID: number,
  username: string,
  userRole: string
}

export default function Nav(props: NavProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Icon as={FaHamburger} w={4} h={4} alignSelf={"baseline"}/>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {navButtons(props.userID, props.username, props.userRole)}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {/* <MobileNav /> */}
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <Link to={navItem.href ?? "#"}>{navItem.label}</Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Link to={href ?? "#"}>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Link>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

// const MobileNav = () => {
//   return (
//     <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   )
// }

// const MobileNavItem = ({ label, children, href }: NavItem) => {
//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Box
//         py={2}
//         as="a"
//         href={href ?? '#'}
//         justifyContent="space-between"
//         alignItems="center"
//         _hover={{
//           textDecoration: 'none',
//         }}>
//         <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={'all .25s ease-in-out'}
//             transform={isOpen ? 'rotate(180deg)' : ''}
//             w={6}
//             h={6}
//           />
//         )}
//       </Box>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={'solid'}
//           borderColor={useColorModeValue('gray.200', 'gray.700')}
//           align={'start'}>
//           {children &&
//             children.map((child) => (
//               <Box as="a" key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Box>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   )
// }

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  {
    label: "Home",
    href: "",
  },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
];
