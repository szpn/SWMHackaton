import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../logo.jpg'


function ResponsiveAppBar() {

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">
            <img src={logo} width={64} height={64} style={{ padding: '10px', borderRadius: '50%'}} />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Krak_BUCKS
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;