import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';

const Container = styled.div`
	background: ${(props) => props.theme.darkerShadeColor};
	border-radius: 5px;
`;

interface ChartProps {
	coinId: string;
}

interface ICoinHistory {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<ICoinHistory[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId)
		// { refetchInterval: 10000 }
	);
	return (
		<Container>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type='candlestick'
					series={[
						{
							name: 'Price',
							data: data?.map((price) => ({
								x: price.time_close,
								y: [price.open, price.high, price.low, price.close],
							})),
						},
					]}
					options={{
						yaxis: {
							show: false,
							tooltip: {
								enabled: true,
							},
						},
						xaxis: {
							type: 'datetime',
							axisBorder: { show: false },
							axisTicks: { show: false },
						},
						theme: { mode: 'dark' },
						chart: {
							type: 'candlestick',
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						plotOptions: {
							candlestick: {
								colors: {
									upward: '#0ed27a',
									downward: '#d3413b',
								},
							},
						},
						fill: {
							type: 'solid',
						},
						tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
						title: { text: 'Price(closed time - 15d)', offsetY: 10 },
					}}
				/>
			)}
		</Container>
	);
}

export default Chart;
