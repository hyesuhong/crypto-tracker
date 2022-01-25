import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRounterProps {
	toggleTheme: () => void;
	isDark: boolean;
}

function Router({ toggleTheme, isDark }: IRounterProps) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/:coinId/*' element={<Coin isDark={isDark} />}></Route>
				<Route path='/' element={<Coins toggleTheme={toggleTheme} />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
