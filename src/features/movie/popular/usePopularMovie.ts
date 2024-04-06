import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import {delayExecution, popularApi} from '../../../apis/movieApi'
import { MovieDetail, ListResponse } from '../../../types'

const usePopularMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    ['popularMovie'],
      delayExecution(popularApi)
  )
}

export default usePopularMovie
