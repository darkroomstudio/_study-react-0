## 스켈레톤 레이아웃이란?

- 스켈레톤 레이아웃은 사용자에게 로딩 중임을 알려주는 디자인 패턴입니다.
- 로딩 중임을 나타내는 스켈레톤을 애니메이션으로 표현하여 사용자에게 더 나은 경험을 제공할 수 있습니다.
- 로딩 중임을 나타내는 스켈레톤의 디자인을 실제 컨텐츠와 일치시켜 사용자가 레이아웃을 미리 볼 수 있도록 합니다.

---

## 사용하는 이유

- 페이지를 렌더링하는데 시간이 오래 걸리는 경우 사용자는 페이지가 멈춰있는 것으로 인식할 수 있습니다.
- 이러한 경우 사용자는 페이지가 느리다고 느끼게 되어 페이지를 쉽게 떠나는 이유가 될 수 있습니다.
- 컨텐츠를 기다리는 경우 지루함을 방지하고자, 유저 친화적인 UI를 제공하기 위해 사용합니다.

---

## 대표적인 사례

- Facebook, Linkedin, Youtube 등의 SNS 서비스에서 사용자가 스크롤을 내리면서 새로운 컨텐츠를 로딩하는 경우 스켈레톤 레이아웃을 사용합니다.

  ![img](https://miro.medium.com/v2/resize:fit:700/0*9uxZA3XMHNjJsLT5.png)
  ![img](https://miro.medium.com/v2/resize:fit:700/0*s7uxK77a0FY43NLe.png)
  ![img](https://miro.medium.com/v2/resize:fit:700/0*ABjKedHjIe8El9RJ.png)

  이미지 출처 : [medium](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)

---

## 스켈레톤 레이아웃 구현 방법

1. 라이브러리 사용
   - [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)
   - [react-placeholder](https://github.com/buildo/react-placeholder)
   - [react-content-loader](https://github.com/danilowoz/react-content-loader)
2. 직접 구현하기

---

## 공부를 위해 직접 구현해본 스켈레톤의 포인트

1. 보편적인 Component UI를 그래도 가져와서 하는 방식으로 스켈레톤 UI로 만들지않았습니다.
2. 기존 Component UI가 Slider로 구성되어있는 상황이였습니다
3. 스켈레톤 UI를 Slider로 구성하지않고 일반적인 레이아웃으로 구성하였습니다.
4. 백그라운드 컬러를 그라데이션으로 변경하여 애니메이션을 추가하였습니다.
5. count props 통해 스켈레톤 UI의 개수를 조절할 수 있습니다.
6. \*애니메이션은 백그라운드 이미지의 위치를 변경하여 구현하였습니다.
7. 확인을 위해 강제로 로딩을 지연시키는 메소드를 추가하여 스켈레톤을 보이게 하였습니다.

- 개인적인 소감

  왜 사용하는지, 어떻게 사용하는지 공부가 되었으니 직접 구현하기보단, 라이브러리를 사용해서 쉽고 빠르게만드는게 좋은 것 같습니다.

---

## 작업시 경험한 이슈 사항

1. react-query에서 suspense 옵션을 사용하려고 하니 데이터 로딩을 기다리는 동안 페이지 전체가 로딩이 지연 걸리는 현상을 발견<br>
   => `suspense`가 데이터 로딩을 기다리는동안 전체 컴포넌트의 렌더링을 지연시킴<br>
   Suspense tag에 fallback이 정상적으로 동작하지않는 현상 발견
2. 그래서 `suspense`를 사용하지않고 `isLoading` 상태를 통해 스켈레톤 UI를 보여주는 방식으로 변경

---

## 직접 구현해본 예시

1. 기존 컴포넌트 레이아웃에서 스켈레톤 UI를 사용하고싶은 부분을 가져옵니다.
2. 기존 컴포넌트의 스타일을 복사하여 스켈레톤 UI에 맞게 수정합니다.
3. 백그라운드 컬러를 그라데이션 형태로 변경합니다.
4. \*백그라운드 이미지의 위치를 변경하여 애니메이션을 추가합니다.
5. count props 통해 스켈레톤 UI의 개수를 조절할 수 있습니다.
6. 현재 프로젝트에선 react-query를 사용해서 isLoading 상태를 감지할 수 있어 로딩상태일때 스켈레톤UI로 대체합니다.

```typescript jsx
const pulseKeyframe = keyframes`
  100% {
   background-position: -100% 0;
  }
`
const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.25s linear infinite;
`
const sharedStyle = css`
  background-image: linear-gradient(120deg, #e4e4e4 30%, #f1f1f1 38%, #f1f1f1 40%, #e4e4e4 48%);
  background-size: 200% 100%;
  background-position: 100% 0;
`;

// 설명에필요없는 스타일은 삭제 해두었습니다.
const CardWrapper = styled.div``
const Base = styled.div<Props>``
const ImgCard = styled.span<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${sharedStyle};
  display: block;
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`
const Title = styled.div<Props>`
  ${({ animation }) => animation && pulseAnimation};
  ${sharedStyle};
  height: 16px;
`
const Year = styled.div<Props>`
  ${({ animation }) => animation && pulseAnimation};
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

export default function CardSkeleton({count = 1, animation = true,/*설명에필요없는props제거*/ }: Props) {
  return (
      <CardWrapper>
        {Array.from({ length: count }, (_, index) => (
            <Base key={index}>
              <ImgCard animation={animation}/>
              <Title animation={animation} />
              <Year animation={animation} />
              <Average animation={animation} />
            </Base>
        ))}
      </CardWrapper>
  )
}
```

사용처

```typescript jsx
export default function UpcomingSection(){
  const { data: upcomingMovieResponse, isLoading } = useUpcomingMovie()

  return (
    <Base>
      <Title>개봉 예정작</Title>
      {isLoading ? (
          <CardSkeleton count={5} />
      ) : (
          <Slider>
            {upcomingMovieResponse?.data?.results.map((movie) => (
              <Card key={movie.id} />
            ))}
          </Slider>
      )}
    </Base>
  )
}
```
