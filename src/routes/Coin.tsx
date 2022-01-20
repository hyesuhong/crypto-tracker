import { info } from 'console';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  max-width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
`;

const blinkAni = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`;

const Loader = styled.h4`
  text-align: center;
  animation: ${blinkAni} 0.6s linear infinite alternate;
`;

interface ILocation {
  state: {
    name: string;
  };
}
// 타입 정해주기...
interface IInfoData {

}

interface IPriceData {

}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : null}
    </Container>
  );
}

export default Coin;