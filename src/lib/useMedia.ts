import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface mediaQueries {
	matchesTablet: boolean;
	matchesMobile: boolean;
	matchesDesktop: boolean;
	matchesLaptop: boolean;
	matchesHD: boolean;
}

export const useMedia = (): mediaQueries => {
	const theme = useTheme();
	const matchesMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
	const matchesTablet = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md));
	const matchesLaptop = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.md, theme.breakpoints.values.lg));
	const matchesDesktop = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.md));
	const matchesHD = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.xl));
	return {
		matchesTablet,
		matchesMobile,
		matchesDesktop,
		matchesLaptop,
		matchesHD,
	};
};