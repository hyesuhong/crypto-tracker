import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const CoinList = styled.ul`
  
`;

const Coin = styled.li`
  background-color: rgba(255,255,255,0.5);
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s;
  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: rgba(255,255,255,0.2);
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {
            coins.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                    alt=''
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))
          }
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;