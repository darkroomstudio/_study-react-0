import {useMemo, useState} from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 5rem;
`

const veryHardCalculation = (value:number):number => {
  console.log('어려운 계산');
  for (let i = 0; i < 1000000000; i++) {} // 시간이 오래 걸리는 계산, 단지 성능 측정을 위한 코드
  return value * value;
}
const veryEasyCalculation = (value:number):number => {
  console.log('쉬운계산');
  return value + value;
}
export default function ExampleUseMemo() {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const hardValue = useMemo(() => {
    return veryHardCalculation(count); // useMemo를 사용하여 count의 제곱값을 계산
  }, [count]); // count가 변경될 때만 다시 계산

  // 메모제이션을 사용하지않는 다면 아래와 같이 어려운 계산이 쉬운 계산을 할 때마다 실행됨
  // const hardValue = veryHardCalculation(count);

  const easyValue = veryEasyCalculation(count2); // useMemo를 사용하여 count의 덧셈 값을 계산

  return (
      <Wrapper>
        <div>
          <button onClick={() => setCount(count + 1)}>곱하기</button>
          <p>카운트: {count}</p>
          <p>제곱: {hardValue}</p>
        </div>
        <div>
          <button onClick={() => setCount2(count2 + 1)}>더하기</button>
          <p>카운트: {count2}</p>
          <p>덧셈: {easyValue}</p>
        </div>
      </Wrapper>
  );
};