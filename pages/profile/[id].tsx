import {
  Box,
  Button,
  Heading,
  Image,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FollowModal } from "../../components/FollowModal";
import {
  useFollowersLazyQuery,
  useFollowingLazyQuery,

  useProfileQuery,
} from "../../graphql/generated/generated";

export default function Profile() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useProfileQuery({
    skip: !id,
  });
  const [getUserFollowing, { data: followingData }] = useFollowingLazyQuery();
  const [getUserFollowers, { data: followersData }] = useFollowersLazyQuery();

  return (
    data?.profile && (
      <>
        <VStack w="100%" flexDir={{ base: "column", md: "row" }} px="20px">
          <Box>
            <Image
              alt="profile-pic"
              borderRadius={"lg"}
              src={
                data.profile.coverPicture?.__typename === "MediaSet" &&
                data.profile.coverPicture?.original.url
              }
            />
          </Box>
          <VStack align="start" w={"100%"} p="20px">
            <Heading>{data.profile.name}</Heading>
            <Text>{data.profile.bio}</Text>
            <StatGroup w="100%" border={"1px"} borderRadius="md" p="12px">
              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber
                  cursor={"pointer"}
                  onClick={() => {
                    getUserFollowers({
                      variables: {
                        request: { profileId: data.profile?.id, limit: 10 },
                      },
                    });
                    onToggle();
                  }}
                >
                  {data.profile.stats.totalFollowers}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Following</StatLabel>
                <StatNumber
                  cursor={"pointer"}
                  onClick={() => {
                    getUserFollowing({
                      variables: {
                        request: { address: data.profile?.ownedBy, limit: 10 },
                      },
                    });
                    onToggle();
                  }}
                >
                  {data.profile.stats.totalFollowing}
                </StatNumber>
              </Stat>
            </StatGroup>
            <Button variant={"outline"}>Follow</Button>
          </VStack>
        </VStack>
        {followingData && (
          <FollowModal
            title="Following"
            isOpen={isOpen}
            toggle={onToggle}
            follows={followingData.following.items}
          />
        )}
      </>
    )
  );
}
