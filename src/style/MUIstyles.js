import * as colors from './portfolioColors';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif' // Specify Montserrat as the first choice
  }
});

export const modalDialog = {
  width: 'auto',
  maxWidth: '442px',
  minWidth: '300px',
  border: '0px solid #000',
  bgcolor: colors.PORTFOLIO_WHITE,
  borderRadius: '4px',
  paddingBottom: '30px'
};

export const modalHeader = {
  fontFamily: 'Montserrat, Arial, sans-serif',
  fontSize: '1.2rem',
  letterSpacing: '0.02857em',
  textAlign: 'center',
  fontWeight: 'bold',
  paddingBottom: '18px'
};

export const modalClose = {
  position: 'absolute',
  top: 'calc(-1/4 * var(--IconButton-size))',
  right: 'calc(-1/4 * var(--IconButton-size))',
  boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
  borderRadius: '50%',
  color: colors.PORTFOLIO_BLACK,
  bgcolor: colors.PORTFOLIO_ORANGE,
  transition: 'background-color 0.2s, color 0.2s ease-in-out',
  ':hover': {
    color: colors.PORTFOLIO_WHITE,
    bgcolor: colors.PORTFOLIO_BLACK
  }
};

export const LoadButton = {
  fontFamily: 'Montserrat, Arial, sans-serif',
  fontWeight: 'bold',
  minWidth: 125,
  borderRadius: '90px',
  backgroundColor: colors.PORTFOLIO_ORANGE,
  color: colors.PORTFOLIO_BLACK,
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  ':hover': {
    color: colors.PORTFOLIO_WHITE,
    bgcolor: colors.PORTFOLIO_BLACK
  }
};

export const burgerItem = {
  transition: 'transform 0.5s ease-in-out, color 0.2s ease-out',
  fontWeight: '500',
  letterSpacing: '0.02857em',
  ':hover': {
    color: colors.PORTFOLIO_WHITE,
    cursor: 'pointer'
  }
};

export const contactCard = {
  wordBreak: 'break-all',
  maxWidth: 500,
  minWidth: 300,
  color: colors.PORTFOLIO_BLACK,
  border: '1px solid',
  transition: 'border 0.2s ease-in-out',
  borderColor: colors.PORTFOLIO_GREEN,
  ':hover': {
    cursor: 'pointer',
    borderColor: colors.PORTFOLIO_ORANGE
  }
};
