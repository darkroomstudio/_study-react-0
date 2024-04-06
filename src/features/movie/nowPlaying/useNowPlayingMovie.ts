import { useQuery } from 'react-query'
import { delayExecution, nowPlayingApi } from '../../../apis/movieApi'
import { AxiosError, AxiosResponse } from 'axios'
import { ListResponse, MovieDetail } from '../../../types'

const useNowPlayingMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    ['nowPlayingMovie'],
    delayExecution(nowPlayingApi)
  )
}

export default useNowPlayingMovie
