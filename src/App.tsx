import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

// createGlobalStyle : 전역으로 부를 수 있는 스타일 컴포넌트를 생성
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  font-family: 'Roboto', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
* {
  box-sizing: border-box;
}
`;

// Fragment : 유령 컴포넌트<>. 여러 컴포넌트를 한 번에 리턴할 수 있도록 해줌(div로 감싸지 않고!)
function App() {
	const [isDark, setIsDark] = useState(false);
	const toggleTheme = () => setIsDark((current) => !current);
	return (
		<>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<GlobalStyle />
				<Router toggleTheme={toggleTheme} isDark={isDark} />
				{
					// initialIsOpen=true 로 설정하면 리액트 쿼리에서 받아오는 데이터를 볼 수 있음
				}
				<ReactQueryDevtools initialIsOpen={false} />
			</ThemeProvider>
		</>
	);
}

export default App;

/*
App(isDark, modifierFn)
-> Router -> Coins(modifier)
-> Router -> Coin -> Chart
이게 global state의 정의 : 어플리케이션이 특정값을 어디에서든 접근할 때 사용(isDark처럼)
기본 react에서는 모든 컴포넌트에 props로 다 내려보내줘야 함 -> state management가 필요한 이유
*/
