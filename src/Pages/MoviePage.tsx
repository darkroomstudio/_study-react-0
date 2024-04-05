import styled from '@emotion/styled'
import UpcomingMovieSection from '../features/movie/upcoming'
import NowPlayingSection from '../features/movie/nowPlaying'
import PopularMovieSection from '../features/movie/popular'
import TopRateMovieSection from '../features/movie/topRate'

const Main = styled.main`
  max-width: 1200px;
  min-height: 100vh;
  margin: auto;
  margin-top: 0px;
`

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`

export default function MoviePage() {
  return (
    <Main>
      <Container>
        <UpcomingMovieSection />
        <NowPlayingSection />
        <PopularMovieSection />
        <TopRateMovieSection />
      </Container>
    </Main>
  )
}
