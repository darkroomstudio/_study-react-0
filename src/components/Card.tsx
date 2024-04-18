import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'

interface Props {
  linkUrl: string
  title: string
  year: string
  posterPath: string
  voteAverage: number
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-inline: 10px;
`

const Base = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

const Title = styled.h4`
  color: #292a32;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Year = styled.div`
  color: #292a32;
  font-size: 14px;
  font-weight: 400;
`

const Average = styled.div`
  color: #74747b;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  align-items: center;
`

const Card: React.FC<Props> = ({
  linkUrl,
  title,
  posterPath,
  voteAverage,
  year,
}) => (
  <StyledLink to={linkUrl}>
    <Base>
      <ImageWrapper>
        <Image src={posterPath} alt={`${title} 의 포스터`} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Year>{year}</Year>
      <Average>
        <span>평균</span>
        <span>
          &nbsp;
          <AiFillStar />
        </span>
        <span>{voteAverage}</span>
      </Average>
    </Base>
  </StyledLink>
)

export default Card
