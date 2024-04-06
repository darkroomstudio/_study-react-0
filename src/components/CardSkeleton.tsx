import React from 'react'
import { keyframes, css } from '@emotion/react'
import styled from '@emotion/styled'

interface Props {
  height?: number
  rounded?: boolean
  count?: number
  unit?: string
  animation?: boolean
  style?: React.CSSProperties
}

const pulseKeyframe = keyframes`
  100% {
    background-position: -100% 0;
  }
`

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.25s linear infinite;
`

const sharedStyle = css`
  background-image: linear-gradient(
    120deg,
    #e4e4e4 30%,
    #f1f1f1 38%,
    #f1f1f1 40%,
    #e4e4e4 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
`

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`
const Base = styled.div<Props>`
  flex: 1;
  display: flex;
  gap: 5px;
  flex-direction: column;
`
const ImgCard = styled.span<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${({ rounded }) => rounded && 'border-radius: 8px'};
  ${sharedStyle};
  display: block;
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`
const Title = styled.div<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${({ rounded }) => rounded && 'border-radius: 4px'};
  ${sharedStyle};
  height: 16px;
`
const Year = styled.div<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${({ rounded }) => rounded && 'border-radius: 4px'};
  ${sharedStyle};
  width: 40px;
  height: 16px;
`
const Average = styled.div<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${({ rounded }) => rounded && 'border-radius: 4px'};
  ${sharedStyle};
  width: 80px;
  height: 16px;
`

export default function CardSkeleton({
  count = 1,
  animation = true,
  height,
  rounded,
  unit = 'px',
  style,
}: Props) {
  return (
    <CardWrapper>
      {Array.from({ length: count }, (_, index) => (
        <Base key={index}>
          <ImgCard
            rounded={rounded}
            height={height}
            unit={unit}
            animation={animation}
            style={style}
          />
          <Title animation={animation} />
          <Year animation={animation} />
          <Average animation={animation} />
        </Base>
      ))}
    </CardWrapper>
  )
}
