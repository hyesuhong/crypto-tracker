import { Helmet } from 'react-helmet';
import { Link, useMatch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';
import { IconSun, IconMoon } from '../assets/image/icon';

const HeaderWarpper = styled.header`
	position: relative;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 700;
	color: ${(props) => props.theme.accentColor};
`;

const ToggleBtn = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	width: 50px;
	height: 24px;
	border-radius: 24px;
	background: ${(props) => props.theme.shadeColor};
	border: none;
	outline: none;
	cursor: pointer;

	&::after {
		content: '';
		position: absolute;
		top: 2px;
		left: calc(100% - 22px);
		width: 20px;
		height: 20px;
		border-radius: 20px;
		background: ${(props) => props.theme.darkerShadeColor};
		transition: all 0.3s;
	}

	&.dark::after {
		left: 2px;
	}

	svg {
		position: absolute;
		top: 3px;
		width: 18px;
		height: 18px;
	}
	svg:first-child {
		left: 4px;
	}
	svg:last-child {
		right: 4px;
	}
`;

const BackBtn = styled.button`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateY(-50%);
	width: 30px;
	height: 30px;
	background: transparent;
	border: none;
	outline: none;
	padding: 0;
	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50%;
		height: 50%;
		border-top: 2px solid ${(props) => props.theme.textColor};
		border-left: 2px solid ${(props) => props.theme.textColor};
		transform: translate(-50%, -50%) rotate(-45deg);
		opacity: 0.7;
		pointer-events: none;
	}
	a {
		display: block;
		width: 100%;
		height: 100%;
	}
`;

interface IHeaderProps {
	title: string;
}

function Header({ title }: IHeaderProps) {
	const isDark = useRecoilValue(isDarkAtom);
	// atom을 수정하는 훅
	const setterIsDark = useSetRecoilState(isDarkAtom);
	const toggleTheme = () => setterIsDark((prev) => !prev);

	const isMain = useMatch('/');

	return (
		<HeaderWarpper>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{isMain !== null ? null : (
				<BackBtn>
					<Link to='/' />
				</BackBtn>
			)}
			<Title>{title}</Title>
			<ToggleBtn className={isDark ? 'dark' : 'light'} onClick={toggleTheme}>
				<IconSun fill={isDark ? '#fff' : '#000'} />
				<IconMoon fill={isDark ? '#fff' : '#000'} />
			</ToggleBtn>
		</HeaderWarpper>
	);
}

export default Header;
