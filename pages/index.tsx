import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getRecommendedProfiles } from "../gql/queries";

export default function Home() {
  const router = useRouter();
  const { data, loading } = useQuery(getRecommendedProfiles);

  return (
    <Wrap spacing={"30px"} justify={"center"}>
      {!loading &&
        data?.recommendedProfiles
          .filter((profile: any) => profile.name)
          .map((profile: any, i: number) => {
            return (
              <WrapItem key={i}>
                <Card align={"center"} variant={"outline"} w="300px" h="300px">
                  <CardBody>
                    {profile.picture && (
                      <Image
                        boxSize={"180px"}
                        borderRadius="lg"
                        src={profile.picture.original.url}
                      />
                    )}
                  </CardBody>
                  <CardFooter>
                    <HStack>
                      <Heading size={"md"}>{profile.name}</Heading>
                      <Button
                        onClick={() => {
                          router.push(`/profile/${profile.id}`);
                        }}
                      >
                        View
                      </Button>
                    </HStack>
                  </CardFooter>
                </Card>
              </WrapItem>
            );
          })}
    </Wrap>
  );
}
