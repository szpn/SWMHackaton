import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../logo.jpg'


function TopBar() {

  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">
            <img src={logo} width={64} height={64} style={{ padding: '10px', borderRadius: '50%' }} />
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
export default TopBar;