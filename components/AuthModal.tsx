import {
  Button,
  Center,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { useEffect } from "react";
import { FaSignature } from "react-icons/fa";
import { useConnect } from "wagmi";
import { useWalletAuth } from "../hooks/useWalletAuth";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const ConnectWallet = () => {
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (
    <VStack p="12px" align={"start"}>
      <Heading size={"md"}>Connect your wallet</Heading>
      <Text>Connect with one of your wallets to login</Text>
      <Center pt="12px" w="100%">
        <Button variant={"outline"} size="lg" onClick={() => connect()}>
          MetaMask Wallet
        </Button>
      </Center>
    </VStack>
  );
};

interface LoginProps {
  onLogin: () => void;
}
const Login = ({ onLogin }: LoginProps) => {
  const { login, isLoggedIn } = useWalletAuth();

  useEffect(() => {
    if (isLoggedIn) {
      onLogin();
    }
  }, [isLoggedIn]);

  return (
    <VStack align={"start"}>
      <Heading size="md">Please sign the message</Heading>
      <Text>
        Tross uses this signature to verify you are the owner of this address
      </Text>
      <Center pt="12px" w="100%">
        <Button
          leftIcon={<Icon as={FaSignature} />}
          variant={"outline"}
          size={"lg"}
          onClick={() => login()}
        >
          Sign Message
        </Button>
      </Center>
    </VStack>
  );
};

export const AuthModal = ({ isOpen, toggle }: Props) => {
  const { isConnected, isLoggedIn } = useWalletAuth();

  return (
    <Modal isOpen={isOpen} onClose={toggle} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Login
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {!isConnected ? (
            <ConnectWallet />
          ) : !isLoggedIn ? (
            <Login onLogin={toggle} />
          ) : (
            <Text>You are</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
