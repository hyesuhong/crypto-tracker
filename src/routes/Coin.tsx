import { useQuery } from 'react-query';
import { Route, useMatch } from 'react-router';
import { Routes, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Header from '../components/Header';
import Chart from './Chart';
import Price from './Price';

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

const InfoList = styled.dl`
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const InfoSummary = styled.dt`
	display: flex;
	align-itmes: center;
	justify-content: space-between;
	padding: 10px 20px;
	background: ${(props) => props.theme.shadeColor};
	border-radius: 5px;
	text-align: center;
	line-height: 120%;

	p > span {
		font-size: 0.7em;
	}
`;

const InfoDesc = styled.dd`
	margin-top: 10px;
	word-break: keep-all;
`;

const Tabs = styled.p`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10px;
	margin: 20px auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	background-color: ${(props) => props.theme.shadeColor};
	border-radius: 5px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
		padding: 7px 0;
		pointer-events: ${(props) => (props.isActive ? 'none' : 'auto')};
	}
`;

type IParams = {
	coinId: string;
};

interface ILocation {
	state: {
		name: string;
	};
}

// 타입 정해주기...
interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface IPriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const { coinId } = useParams() as IParams;
	const { state } = useLocation() as ILocation;
	const priceMatch = useMatch('/:coinId/price');
	const chartMatch = useMatch('/:coinId/chart');

	// react-query에서 키는 유니크해야 함. -> 배열로 줘서 첫번째는 카테고리 역할, 두번째는 url 정보를 넘겨서 유니크하게 만들었음.
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		['info', coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 5000,
		}
	);

	const loading = infoLoading || tickersLoading;

	return (
		<Container>
			<Header
				title={
					state?.name
						? state.name
						: loading
						? 'Loading...'
						: (infoData?.name as string)
				}
			/>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<InfoList>
						<InfoSummary>
							<p>
								<span>Rank</span>
								<br />
								{infoData?.rank}
							</p>
							<p>
								<span>Symbol</span>
								<br />
								{infoData?.symbol}
							</p>
							<p>
								<span>Price</span>
								<br />$ {tickersData?.quotes.USD.price.toFixed(3)}
							</p>
						</InfoSummary>
						<InfoDesc>{infoData?.description}</InfoDesc>
					</InfoList>
					<InfoList>
						<InfoSummary>
							<p>
								<span>Total Supply</span>
								<br />
								{tickersData?.total_supply}
							</p>
							<p>
								<span>Max Supply</span>
								<br />
								{tickersData?.max_supply}
							</p>
						</InfoSummary>
					</InfoList>

					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Routes>
						<Route path='chart' element={<Chart coinId={coinId} />} />
						<Route
							path='price'
							element={
								tickersData && (
									<Price coinId={coinId} quotes={tickersData?.quotes} />
								)
							}
						/>
					</Routes>
				</>
			)}
		</Container>
	);
}

export default Coin;
