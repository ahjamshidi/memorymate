'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const primary = {
  main: '#232323',
  light: '#464646',
  dark: '#111111',
  contrastText: '#fff',
};
const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette:{
    primary,
  }
});

export default theme;
