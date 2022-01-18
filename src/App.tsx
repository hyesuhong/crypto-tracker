// import Circle from './Circle';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor}
`;

const Btn = styled.button`
  background-color: ${props => props.theme.btnColor};

`;

function App() {
  const [value, setValue] = useState('');
  /*
  any는 타입스크립트의 타입 중 하나. 무엇이든 될 수 있다는 의미
  하지만 최대한 any는 배제하는 방향으로 가는 것이 좋음
  event의 타입을 지정하기 위해서는 구글링 핈

  아래는 타입스크립트에게 input 요소에서 이벤트가 발생할 것이라는 것을 알려주는 것
  */
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello ${value}`);
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='username'
          value={value}
          onChange={onChange}
        />
        <Btn>Log in</Btn>
      </form>
    </Container>
  );
}

export default App;
