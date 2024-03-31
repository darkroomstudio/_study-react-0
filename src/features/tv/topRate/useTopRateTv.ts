import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { topRatedApi } from '../../../apis/tvApi'
import { ListResponse, TVDetail } from '../../../types'

const useTopRateTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(
    'topRateTv',
    topRatedApi
  )
}

export default useTopRateTv
