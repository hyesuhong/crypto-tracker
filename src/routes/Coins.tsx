import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchCoins } from '../api';
import Header from '../components/Header';

const Container = styled.div`
	max-width: 480px;
	padding: 0 20px;
	margin: 0 auto;
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

const CoinList = styled.ul``;

const Coin = styled.li`
	background-color: ${(props) => props.theme.shadeColor};
	border-radius: 5px;
	margin-bottom: 10px;
	transition: all 0.3s;
	a {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20px;
	}
	a::after {
		content: '→';
		flex: 1;
		text-align: right;
		opacity: 0;
		transform: translateX(-5px);
		transition: all 0.3s;
	}
	&:hover {
		color: ${(props) => props.theme.accentColor};
		background-color: ${(props) => props.theme.darkerShadeColor};

		a::after {
			opacity: 1;
			transform: translateX(0);
		}
	}
`;

const Img = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 5px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

	return (
		<Container>
			<Header title='Coin List' />
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<Img
									src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
									alt=''
								/>
								{coin.name}
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
