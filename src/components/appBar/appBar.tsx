'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { usePathname, useRouter } from 'next/navigation';

export default function SimpleAppBar() {
  const router = useRouter();
  const handleBackBut = () => {
    router.back();
  };
  const pathname = usePathname();
  return (
    <AppBar position="fixed">
      <Toolbar>
        {pathname !== '/' ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleBackBut}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        ) : (
          ''
        )}
        <Typography variant="h6" sx={{ my: 2, flexGrow: 2 }}>
          Mm
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
