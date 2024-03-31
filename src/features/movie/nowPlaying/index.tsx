import React from 'react'
import styled from '@emotion/styled'

import Slider from '../../../components/Slider'
import useNowPlayingMovie from './useNowPlayingMovie'
import Card from '../../../components/Card'

const Base = styled.div`
  margin-bottom: 42px;
`

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`

const NowPlayingSection: React.FC = () => {
  const { data: nowPlayingMovieResponse, isLoading } = useNowPlayingMovie()
  const getYear = (release_date: string) => release_date.split('-')[0] || ''

  return (
    <Base>
      <Title>현재 상영중</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {nowPlayingMovieResponse?.data?.results.map((movie) => (
            <Card
              key={movie.id}
              linkUrl={`/movie/${movie.id}`}
              title={movie.title}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${movie.poster_path}`}
              voteAverage={movie.vote_average}
              year={getYear(movie.release_date)}
            />
          ))}
        </Slider>
      )}
    </Base>
  )
}

export default NowPlayingSection
