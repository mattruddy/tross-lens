import { useLazyQuery } from "@apollo/client";
import { Image, Text, VStack } from "@chakra-ui/react";
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
      <VStack px="20px">
        <Image src={data.profile.coverPicture?.original.url} />

        <VStack>
          <Text>{data.profile.bio}</Text>
        </VStack>
      </VStack>
    )
  );
}
