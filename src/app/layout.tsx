import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import SimpleBottomNavigation from '@/components/bottomNavigation/bottomNavigation';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import theme from './theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <Typography variant="h6" sx={{ my: 2, flexGrow: 2 }}>
                  Mm
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid
              container
              maxWidth={500}
              rowSpacing={1}
              spacing={2}
              justifyContent="center"
              alignItems="end"
              height={'100%'}
            >
              <Grid item xs={12} height={'100%'}>
                <div className="main-content-container">{children}</div>
                <SimpleBottomNavigation></SimpleBottomNavigation>
              </Grid>
            </Grid>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
