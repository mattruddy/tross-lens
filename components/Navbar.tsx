import {
  Avatar,
  Button,
  Badge,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useConnect } from "wagmi";
import { useWalletAuth } from "../hooks/useWalletAuth";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { AuthModal } from "./AuthModal";
import { useEffect } from "react";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { logout, isLoggedIn } = useWalletAuth();

  console.log({ nav: isLoggedIn });

  return (
    <>
      <HStack
        px="20px"
        w="100%"
        pos="sticky"
        top="0"
        h="14"
        borderBottom={"1px"}
        bgColor="gray.50"
        borderColor="gray.200"
        justify="space-between"
        align={"center"}
        zIndex={"100"}
        shadow="md"
      >
        <Heading as={NextLink} href="/" passHref={true} size={"md"}>
          Tross Graph <Badge>Beta</Badge>
        </Heading>
        {isLoggedIn ? (
          <Menu>
            <MenuButton>
              <Avatar size={"sm"} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={onToggle}>Login</Button>
        )}
      </HStack>
      <AuthModal isOpen={isOpen} toggle={onToggle} />
    </>
  );
};
