import styled from 'styled-components';

const PriceList = styled.dl`
	margin-bottom: 10px;
	padding: 10px;
	background: ${(props) => props.theme.shadeColor};
	border-radius: 5px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const PriceTitle = styled.dt`
	font-size: 12px;
	opacity: 0.5;
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid ${(props) => props.theme.darkerShadeColor};
`;

const PriceDetail = styled.dd`
	display: flex;
	justify-content: space-between;
	align-items: center;

	p {
		text-align: center;
		span:first-child {
			display: block;
			font-size: 12px;
			margin-bottom: 5px;
		}
	}
`;

const ChangePercent = styled.span<{ changeRate: number }>`
	color: ${(props) =>
		props.changeRate > 0
			? props.theme.upwardColor
			: props.changeRate == 0
			? props.theme.textColor
			: props.theme.downwardColor};
	&::before {
		content: '${(props) => props.changeRate}';
	}
	&::after {
		content: '%';
	}
`;

interface PriceProps {
	coinId: string;
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

function Price({ coinId, quotes }: PriceProps) {
	return (
		<div>
			{typeof quotes.USD.price === 'undefined' ? (
				'Loading Price...'
			) : (
				<div>
					<PriceList>
						<PriceTitle>Price Change</PriceTitle>
						<PriceDetail>
							<p>
								<span>30min</span>
								<ChangePercent
									changeRate={quotes.USD.percent_change_30m}
								></ChangePercent>
							</p>
							<p>
								<span>24H</span>
								<ChangePercent
									changeRate={quotes.USD.percent_change_24h}
								></ChangePercent>
							</p>
							<p>
								<span>1W</span>
								<ChangePercent
									changeRate={quotes.USD.percent_change_7d}
								></ChangePercent>
							</p>
							<p>
								<span>1M</span>
								<ChangePercent
									changeRate={quotes.USD.percent_change_30d}
								></ChangePercent>
							</p>
							<p>
								<span>1Y</span>
								<ChangePercent
									changeRate={quotes.USD.percent_change_1y}
								></ChangePercent>
							</p>
						</PriceDetail>
					</PriceList>
					<PriceList>
						<PriceTitle>Market Cap</PriceTitle>
						<PriceDetail>
							<span>{quotes.USD.market_cap}</span>
							<ChangePercent
								changeRate={quotes.USD.market_cap_change_24h}
							></ChangePercent>
						</PriceDetail>
					</PriceList>
					<PriceList>
						<PriceTitle>Volume(24h)</PriceTitle>
						<PriceDetail>
							<span>{quotes.USD.volume_24h}</span>
							<ChangePercent
								changeRate={quotes.USD.volume_24h_change_24h}
							></ChangePercent>
						</PriceDetail>
					</PriceList>
				</div>
			)}
		</div>
	);
}

export default Price;
