import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function MyAppBar() {

  let navigate = useNavigate(); 
  const routeChangeToLogin = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
  const routeChangeToHome = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={routeChangeToHome}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button onClick={routeChangeToLogin} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
