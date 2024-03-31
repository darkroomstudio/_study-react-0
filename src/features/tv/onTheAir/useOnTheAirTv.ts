import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { onTheAirApi } from '../../../apis/tvApi'
import { TVDetail, ListResponse } from '../../../types'

const useOnTheAirTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(
    'onTheAirTv',
    onTheAirApi
  )
}

export default useOnTheAirTv
