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
	time_open: number;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function dateFormat(year: number, month: number, date: number) {
	return `${year}-${addZero(month)}-${addZero(date)}`;
}

function addZero(number: number) {
	return number.toString().padStart(2, '0');
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
								x: new Date(price.time_close * 1000),
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
							labels: { format: 'yyyy-MM-dd' },
							tooltip: {
								formatter: (value) => {
									const date = new Date(value);
									return dateFormat(
										date.getFullYear(),
										date.getMonth(),
										date.getDate()
									);
								},
							},
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
						title: { text: `Past 20days' OHLC`, offsetY: 10 },
					}}
				/>
			)}
		</Container>
	);
}

export default Chart;
