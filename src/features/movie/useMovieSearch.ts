import { useQuery } from 'react-query'
import { searchApi } from '../../apis/movieApi'
import type { Movie } from '../../types'

export function useMovieSearch(query: string): {
  isLoading: boolean
  searchResults: Movie[]
} {
  const queryFn = () => searchApi(query)
  const { isLoading, data, error } = useQuery(['searchMovie', query], queryFn, {
    enabled: Boolean(query),
  })

  if (error) throw new Error(`Failed to fetch search results: ${error}`)
  return {
    isLoading,
    searchResults: data?.data.results ?? [],
  }
}
