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
