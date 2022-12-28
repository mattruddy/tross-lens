import type { AppProps } from "next/app";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { client } from "../configs";
import { WagmiConfig } from "wagmi";
import { AuthData } from "../types";
import { RecoilRoot } from "recoil";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_APIURL });

const authMiddleware = new ApolloLink((operation, forward) => {
  const authData = localStorage.getItem("auth-data");
  if (authData) {
    const auth = JSON.parse(authData) as AuthData;
    operation.setContext({
      headers: {
        "x-access-token": auth.accessToken,
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        height: "100vh",
        width: "100%",
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <WagmiConfig client={client}>
          <RecoilRoot>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </WagmiConfig>
      </ApolloProvider>
    </ChakraProvider>
  );
}
