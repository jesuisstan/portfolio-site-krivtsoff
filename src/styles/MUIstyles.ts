import * as colors from './bookColors';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'GT Walsheim Pro, Arial, sans-serif' // Specify Walsheim as the first choice
  }
});

export const modalDialog = {
  width: 'auto',
  maxWidth: '442px',
  minWidth: '300px',
  border: '0px solid #000',
  bgcolor: colors.BOOK_WHITE,
  borderRadius: '4px',
  paddingBottom: '30px'
};

export const modalHeader = {
  fontFamily: 'GT Walsheim Pro, Arial, sans-serif',
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
  color: colors.BOOK_BLACK,
  bgcolor: colors.BOOK_ORANGE,
  transition: 'background-color 0.2s, color 0.2s ease-in-out',
  ':hover': {
    color: colors.BOOK_WHITE,
    bgcolor: colors.BOOK_BLACK
  }
};

export const LoadButton = {
  fontFamily: '"GT Walsheim Pro", Arial, sans-serif',
  fontWeight: 'bold',
  minWidth: 125,
  borderRadius: '90px',
  backgroundColor: colors.BOOK_ORANGE,
  color: colors.BOOK_BLACK,
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  ':hover': {
    color: colors.BOOK_WHITE,
    bgcolor: colors.BOOK_BLACK
  }
};

export const burgerItem = {
  transition: 'transform 0.5s ease-in-out, color 0.2s ease-out',
  fontWeight: '500',
  letterSpacing: '0.02857em',
  ':hover': {
    color: colors.BOOK_WHITE,
    cursor: 'pointer'
  }
};

export const contactCard = {
  wordBreak: 'break-all',
  maxWidth: 500,
  minWidth: 300,
  color: colors.BOOK_BLACK,
  border: '1px solid',
  transition: 'border 0.2s ease-in-out',
  borderColor: colors.BOOK_GREEN,
  ':hover': {
    cursor: 'pointer',
    borderColor: colors.BOOK_ORANGE
  }
};
