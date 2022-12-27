import { useLazyQuery } from "@apollo/client";
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
import { useEffect } from "react";
import { FollowModal } from "../../components/FollowModal";
import { getFollowers, getFollowing, getProfile } from "../../gql/queries";

export default function ProfilePage() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const [getUserProfile, { data, loading }] = useLazyQuery(getProfile);
  const [getUserFollowing, { data: followingData }] =
    useLazyQuery(getFollowing);
  const [getUserFollowers, { data: followersData }] =
    useLazyQuery(getFollowers);

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getUserProfile({ variables: { request: { profileId: id } } });
    }
  }, [id]);

  return (
    data && (
      <>
        <VStack w="100%" flexDir={{ base: "column", md: "row" }} px="20px">
          <Box>
            <Image
              alt="profile-pic"
              borderRadius={"lg"}
              src={data.profile.coverPicture?.original.url}
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
                        request: { profileId: data.profile.id, limit: 10 },
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
                        request: { address: data.profile.ownedBy, limit: 10 },
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
