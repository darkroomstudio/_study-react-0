import { useQuery } from 'react-query'
import { searchApi } from '../../apis/movieApi'
import { Movie, ListResponse } from '../../types'
import { AxiosError, AxiosResponse } from 'axios'

const useMovieSearch = (query: string) => {
  const queryFn = () => searchApi(query)
  const { isLoading, isError, data } = useQuery<
    AxiosResponse<ListResponse<Movie>>,
    AxiosError
  >(['searchMovie', query], queryFn, { enabled: Boolean(query) })

  return {
    isLoading,
    isError,
    data: data?.data,
  }
}

export default useMovieSearch
