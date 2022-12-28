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
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useConnect } from "wagmi";
import { useWalletAuth } from "../hooks/useWalletAuth";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const Navbar = () => {
  const { login, logout, isConnected, isLoggedIn } = useWalletAuth();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (
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
      {!isConnected ? (
        <Button onClick={() => connect()}>Connect Wallet</Button>
      ) : isLoggedIn ? (
        <Menu>
          <MenuButton>
            <Avatar size={"sm"} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={() => login()}>Login</Button>
      )}
    </HStack>
  );
};
