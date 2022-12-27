import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
// import { LensProvider } from "@lens-protocol/react";
// import { client, lensConfig } from "../configs";
// import { WagmiConfig } from "wagmi";

const APIURL = "https://api-mumbai.lens.dev/";

export const apolloClient = new ApolloClient({
  uri: APIURL,
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
        {/* <WagmiConfig client={client}>
          <LensProvider config={lensConfig}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </LensProvider>
        </WagmiConfig> */}
      </ApolloProvider>
    </ChakraProvider>
  );
}
