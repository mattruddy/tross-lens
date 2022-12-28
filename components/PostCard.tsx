import { Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { Post } from "../graphql/generated/generated";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <VStack w="100%">
      <Card variant={"outline"} w="100%">
        <CardBody>
          <Text>{post.id}</Text>
        </CardBody>
      </Card>
    </VStack>
  );
};
