import { Box, Heading, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { PostCard } from "../components/PostCard";
import {
  CustomFiltersTypes,
  Post,
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated/generated";

export default function Home() {
  const { data, fetchMore, loading } = useExplorePublicationsQuery({
    variables: {
      request: {
        customFilters: [CustomFiltersTypes.Gardeners],
        sortCriteria: PublicationSortCriteria.Latest,
        limit: 5,
      },
    },
  });
  const posts = useMemo(
    () =>
      data?.explorePublications.items.filter(
        (item) => item.__typename === "Post"
      ) as Post[],
    [data]
  );
  const [ref] = useInfiniteScroll({
    loading,
    onLoadMore: () => fetchMore({ variables: {} }),
    hasNextPage: true,
    rootMargin: "0px 0px 400px 0px",
  });
  console.log({ posts });

  return (
    <VStack px="20px" w="100%">
      <Box w="100%" alignItems={"start"}>
        <Heading>Discover</Heading>
      </Box>
      {posts?.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </VStack>
  );
}
