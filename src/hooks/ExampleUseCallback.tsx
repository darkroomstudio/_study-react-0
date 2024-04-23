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
