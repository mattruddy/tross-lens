import {
  Avatar,
  AvatarBadge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useDefaultProfileQuery } from "../../graphql/generated/generated";
import { useWalletAuth } from "../../hooks/useWalletAuth";

export default function Profile() {
  const { address } = useAccount();
  const { isLoggedIn } = useWalletAuth();
  const router = useRouter();
  const { data } = useDefaultProfileQuery({
    variables: { request: { ethereumAddress: address } },
    skip: !address,
  });
  const profile = data?.defaultProfile;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <VStack w="100%" p="20px">
      <Heading>Profile</Heading>
      {profile && (
        <Card w="100%">
          <CardHeader>
            <VStack>
              <Heading size={"md"}> {profile.handle}</Heading>
              <Image
                borderRadius={"full"}
                boxSize={"200"}
                alt={profile.handle}
                src={
                  profile.coverPicture?.__typename === "MediaSet" &&
                  profile.coverPicture.original.url
                }
                fallback={<Avatar />}
              />
            </VStack>
          </CardHeader>
          <CardBody>
            <StatGroup>
              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber>{profile.stats.totalFollowers}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Following</StatLabel>
                <StatNumber>{profile.stats.totalFollowing}</StatNumber>
              </Stat>
            </StatGroup>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
}
