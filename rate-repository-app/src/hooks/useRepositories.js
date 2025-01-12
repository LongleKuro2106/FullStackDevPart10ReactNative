import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, first = 10, after) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, first, after },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, error, refetch };
};

export default useRepositories;