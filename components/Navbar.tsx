import {
  Avatar,
  Badge,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const Navbar = () => {
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
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar size={"sm"} />
        </MenuButton>
        <MenuList>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
