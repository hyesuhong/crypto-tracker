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
	margin-bottom: 10px;
`;

const PriceDetail = styled.dd`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
		content: ' %';
	}
`;

interface PriceProps {
	coinId: string;
	price: number;
	percent_change_15m: number;
	market_cap: number;
	market_cap_change_24h: number;
	volume_24h: number;
	volume_24h_change_24h: number;
}

function Price({
	coinId,
	price,
	percent_change_15m,
	market_cap,
	market_cap_change_24h,
	volume_24h,
	volume_24h_change_24h,
}: PriceProps) {
	return (
		<div>
			{typeof price === 'undefined' ? (
				'Loading Price...'
			) : (
				<div>
					<PriceList>
						<PriceTitle>Price(change rate last 15m)</PriceTitle>
						<PriceDetail>
							<span>{price}</span>
							<ChangePercent changeRate={percent_change_15m}></ChangePercent>
						</PriceDetail>
					</PriceList>
					<PriceList>
						<PriceTitle>Market Cap</PriceTitle>
						<PriceDetail>
							<span>{market_cap}</span>
							<ChangePercent changeRate={market_cap_change_24h}></ChangePercent>
						</PriceDetail>
					</PriceList>
					<PriceList>
						<PriceTitle>Volume(24h)</PriceTitle>
						<PriceDetail>
							<span>{volume_24h}</span>
							<ChangePercent changeRate={volume_24h_change_24h}></ChangePercent>
						</PriceDetail>
					</PriceList>
				</div>
			)}
		</div>
	);
}

export default Price;
