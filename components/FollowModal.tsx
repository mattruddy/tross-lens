import {
  Divider,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  follows: any[];
  title: "Following" | "Followers";
}

export const FollowModal = ({ isOpen, toggle, follows, title }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title} {`(${follows.length})`}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <List spacing={"3"}>
            {follows.map((follow, i) => {
              return (
                <ListItem key={i}>
                  <NextLink
                    href={`/profile/${follow.profile.id}`}
                    passHref
                    onClick={toggle}
                  >
                    <Link>{follow.profile.name}</Link>
                  </NextLink>
                </ListItem>
              );
            })}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
