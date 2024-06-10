'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteRoundedIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountBoxRoundedIcon />} />
      </BottomNavigation>
    </Box>
  );
}
