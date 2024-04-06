import {useQuery} from 'react-query'
import {delayExecution, upcomingApi} from '../../../apis/movieApi'
import {AxiosError, AxiosResponse} from 'axios'
import {ListResponse, MovieDetail} from '../../../types'

const useUpcomingMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
      'upcoming',
      delayExecution(upcomingApi)
  );
};

export default useUpcomingMovie
