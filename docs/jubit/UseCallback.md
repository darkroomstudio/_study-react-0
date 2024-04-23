## 🔥What is useCallback?
- `useCallback`은 메모이제이션된 콜백을 반환하는 리액트 훅
- **콜백 함수를 메모이제이션**하여 렌더링 성능을 최적화
- **의존성 배열이 변경되지 않았다면, 이전에 생성된 콜백 함수를 재사용**
    ### [react-korea useCallback](https://react-ko.dev/reference/react/useCallback)

---

## 🚀 useCallback
- `useCallback`는 함수를 메모이제이션하여 함수 인스턴스가 변경되지 않는 한 재생성 방지
- **의존성 배열이 변경되지 않았다면, 이전에 계산된 값을 재사용**
- 컴포넌트가 리렌더링이 발생하더라도 함수가 재생성되지 않기에 **자식요소의 렌더링이 발생하지 않음**

### 예제 코드 - 확인 하고자 하는 점
1. useCallback을 사용하면 함수가 재생성되지 않음을 확인하려함
2. 이때, 다른 상태값이 변경되어 컴포넌트가 리렌더링이 발생하더라도 함수가 재생성되지 않음을 확인하려함
3. 🔥유즈콜백을 사용함으로써 함수가 재성성되지않기에 부모요소의 리렌더링으로 인해 자식요소의 렌더링이 발생하지 않음을 확인하려함
 ==>`CallbackWrap` 컴포넌트의 `useEffect`가 실행되지 않음을 확인

```tsx
// ExampleUseCallback.tsx
import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import CallbackWrap from "./CallbackWrap";

interface WrapperProps {
  isTheme: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: 300px;
  gap: 1rem;
  margin-top: 5rem;
  flex-direction: column;
  background-color: ${(props) => (props.isTheme ? "black" : "white")};
  color: ${(props) => (props.isTheme ? "white" : "black")};
`;

export default function ExampleUseCallback() {
  const [isTheme, setIsTheme] = useState(false);
  const [size, setSize] = useState(50);

  // 이때 함수 자체로 메모제이션하기에 컴포넌트에 프롭스로 넘겨줄때는 함수를 호출해야함
  const handleBoxStyle = useCallback(() => {
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "red"
    };
  }, [size])

  return (
      <Wrapper isTheme={isTheme}>
        <h1>useCallback Example</h1>
        <button onClick={()=>setIsTheme(!isTheme)}>테마변경</button>
        <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
        />
        <CallbackWrap handleBoxStyle={handleBoxStyle} />
      </Wrapper>
  );
}
```
```tsx
// CallbackWrap.tsx
import {CSSProperties, useEffect, useState} from "react";
import styled from "@emotion/styled";

interface CallbackWrapProps {
  handleBoxStyle: () => CSSProperties;
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function CallbackWrap({ handleBoxStyle }: CallbackWrapProps) {
  const [divStyle, setDivStyle] = useState<CSSProperties>({}); // 초기값을 빈 객체로 설정

  useEffect(() => {
    console.log("CallbackWrap Size Changed!!");
    setDivStyle(handleBoxStyle()); // handleBoxStyle 함수를 호출하여 return된 객체를 divStyle로 설정
  }, [handleBoxStyle]);

  return (
      <Wrapper>
        <h1>CallbackWrap</h1>
        <div style={divStyle}></div>
      </Wrapper>
  );
}
```