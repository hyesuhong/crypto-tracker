import { atom } from 'recoil';

export const isDarkAtom = atom({
	key: 'isDark',
	default: window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches,
});
