import { useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.bgColor};
  border-radius: 100%;
  border: 1px solid ${props => props.borderColor};
`;

/*
  object 에 타입을 알려주고 싶다면 interface를 사용
  object가 어떻게 보일지 설명해주는 것!
*/
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  // useState의 기본값이 입력되었다면 타입스크립트는 그것을 기반으로 타입을 지정함
  const [counter, setCounter] = useState(1);
  /* state의 타입이 변할 것 같다면 브라켓으로 타입을 알려줄 수 있음
  const [value, setValue] = useState<number|string>(0); */
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}></Container>;
}

export default Circle;