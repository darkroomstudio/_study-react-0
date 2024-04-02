import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { popularApi } from '../../../apis/movieApi'
import { MovieDetail, ListResponse } from '../../../types'

const usePopularMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    ['popularMovie'],
    popularApi
  )
}

export default usePopularMovie
