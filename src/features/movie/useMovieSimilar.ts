import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { similarApi } from '../../apis/movieApi';
import { MovieDetail, ListResponse } from '../../types';

const useSimilarMovie = (id: string) => {
  const { isLoading, isError, data } = useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(['movieSimilar', id], () => similarApi(id));

  return {
    isLoading,
    isError,
    data: data?.data
  }
}

export default useSimilarMovie;