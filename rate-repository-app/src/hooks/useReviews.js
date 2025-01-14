import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useReviews = (repositoryId, first, after) => {
  const { data, loading, fetchMore, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, first, after },
  });

  console.log(data);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
      },
    });
  };

  return {
    reviews: data?.repository?.reviews,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useReviews; 