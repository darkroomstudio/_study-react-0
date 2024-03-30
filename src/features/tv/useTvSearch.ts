import { useQuery } from 'react-query';
import { searchApi } from '../../apis/tvApi';
import { TVDetail, ListResponse } from '../../types';
import { AxiosError, AxiosResponse } from "axios";

const useTvSearch = (query: string) => {
  const queryFn = () => searchApi(query);
  const { isLoading, isError, data } = useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(['searchTv', query], queryFn, { enabled: Boolean(query) })

  return {
    isLoading,
    isError,
    data: data?.data
  }
}

export default useTvSearch;