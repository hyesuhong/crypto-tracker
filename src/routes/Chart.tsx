import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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
		() => fetchCoinHistory(coinId),
		{ refetchInterval: 10000 }
	);
	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type='line'
					series={[
						{
							name: 'close price',
							data: data?.map((price) => price.close),
						},
					]}
					options={{
						yaxis: {
							show: false,
						},
						xaxis: {
							type: 'datetime',
							categories: data?.map((price) => price.time_close),
							labels: {
								show: false,
								datetimeFormatter: {
									year: 'yyyy',
									month: 'yy-MMM',
									day: 'MMM-dd',
								},
							},
							axisBorder: { show: false },
							axisTicks: { show: false },
						},
						theme: { mode: 'dark' },
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						stroke: { curve: 'smooth', width: 2 },
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#4780a6'], stops: [0, 100] },
						},
						colors: [`#54c7f4`],
						grid: { show: false },
						tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
