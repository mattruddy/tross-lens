import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Center,
  Heading,
  Image,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getProfile } from "../../gql/queries";

export default function ProfilePage() {
  const router = useRouter();
  const [getUserProfile, { data, loading }] = useLazyQuery(getProfile);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getUserProfile({ variables: { request: { profileId: id } } });
    }
  }, [id]);
  return (
    data && (
      <VStack w="100%" flexDir={{ base: "column", md: "row" }} px="20px">
        <Box>
          <Image
            borderRadius={"lg"}
            src={data.profile.coverPicture?.original.url}
          />
        </Box>
        <VStack w={"100%"} p="20px">
          <Heading>{data.profile.name}</Heading>
          <Text>{data.profile.bio}</Text>
          <StatGroup w="100%" border={"1px"} borderRadius="md" p="12px">
            <Stat>
              <StatLabel>Followers</StatLabel>
              <StatNumber>{data.profile.stats.totalFollowers}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Following</StatLabel>
              <StatNumber>{data.profile.stats.totalFollowing}</StatNumber>
            </Stat>
          </StatGroup>
        </VStack>
      </VStack>
    )
  );
}
