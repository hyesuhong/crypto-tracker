/* https://api.coinpaprika.com */
const BASE_URL = 'https://api.coinpaprika.com/v1';

/* https://ohlcv-api.nomadcoders.workers.dev(nomad coder) */
const NOMAD_URL = 'https://ohlcv-api.nomadcoders.workers.dev';

export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinTickers(coinId: string) {
	return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
		response.json()
	);
}

/* coinpaprika is not free anymore */
export function fetchCoinHistory(coinId: string) {
	return fetch(`${NOMAD_URL}?coinId=${coinId}`).then((response) =>
		response.json()
	);
}
