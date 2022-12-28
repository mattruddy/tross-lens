/* eslint-disable jsx-a11y/alt-text */
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAccount } from "wagmi";
import { CreateProfileForm } from "../components/CreateProfileForm";
import {
  useDefaultProfileQuery,
  useRecommendedProfilesQuery,
} from "../graphql/generated/generated";
import { useWalletAuth } from "../hooks/useWalletAuth";

export default function Home() {
  const { address } = useAccount();
  const { data: profileData } = useDefaultProfileQuery({
    variables: {
      request: {
        ethereumAddress: address,
      },
    },
    skip: !address,
  });
  const { data, loading } = useRecommendedProfilesQuery();

  return (
    <>
      <CreateProfileForm />
      <Wrap spacing={"30px"} justify={"center"}>
        {!loading &&
          data?.recommendedProfiles
            .filter((profile) => profile.name)
            .map((profile, i) => {
              return (
                <WrapItem key={i}>
                  <Card
                    as={NextLink}
                    href={`/profile/${profile.id}`}
                    align={"center"}
                    variant={"outline"}
                    w="300px"
                    h="300px"
                  >
                    <CardBody>
                      {profile.picture && (
                        <Image
                          boxSize={"180px"}
                          borderRadius="lg"
                          src={
                            profile.picture.__typename === "MediaSet" &&
                            profile.picture.original.url
                          }
                        />
                      )}
                    </CardBody>
                    <CardFooter>
                      <HStack>
                        <Heading size={"md"}>{profile.name}</Heading>
                      </HStack>
                    </CardFooter>
                  </Card>
                </WrapItem>
              );
            })}
      </Wrap>
    </>
  );
}
