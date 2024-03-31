import { useQuery } from 'react-query'
import { upcomingApi } from '../../../apis/movieApi'
import { AxiosError, AxiosResponse } from 'axios'
import { ListResponse, MovieDetail } from '../../../types'

const useUpcomingMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    ['upcoming'],
    upcomingApi
  )
}

export default useUpcomingMovie
