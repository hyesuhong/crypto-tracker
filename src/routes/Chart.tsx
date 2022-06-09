import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
	background: ${(props) => props.theme.shadeColor};
	border-radius: 5px;
	&.load {
		background: transparent;
	}
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
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<ICoinHistory[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId)
		// { refetchInterval: 10000 }
	);
	return (
		<Container className={isLoading ? 'load' : ''}>
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
						theme: { mode: isDark ? 'dark' : 'light' },
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
									upward: isDark ? '#0ed27a' : '#0ab72d',
									downward: isDark ? '#d3413b' : '#c3130c',
								},
							},
						},
						fill: {
							type: 'solid',
						},
						tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
						title: { text: 'Price(closed time - 7d)', offsetY: 10 },
					}}
				/>
			)}
		</Container>
	);
}

export default Chart;
