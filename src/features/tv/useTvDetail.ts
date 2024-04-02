import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { detailApi } from '../../apis/tvApi'
import { TVDetail } from '../../types'

const useTvDetail = (id: string) => {
  const queryFn = () => detailApi(id)
  const { isLoading, isError, data } = useQuery<
    AxiosResponse<TVDetail>,
    AxiosError
  >(['tvDetail', id], queryFn)

  return {
    isLoading,
    isError,
    data: data?.data,
  }
}

export default useTvDetail
