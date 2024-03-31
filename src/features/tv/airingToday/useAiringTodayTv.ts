import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

import { airingTodayApi } from '../../../apis/tvApi'
import { TVDetail, ListResponse } from '../../../types'

const useAiringTodayTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>>(
    'airingTodayTv',
    airingTodayApi
  )
}

export default useAiringTodayTv
