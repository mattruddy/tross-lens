import { Flex, Stack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface Props {
  children?: ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({
  children,
  title = "Tross Graph",
  description = "A social graph for tross users",
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="100%" minH="100vh">
        <Navbar />
        <VStack py="20px" justify={"center"} w="100%" height={"100%"}>
          {children}
        </VStack>
      </VStack>
    </>
  );
};
