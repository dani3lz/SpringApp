import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import java_logo from '../img/java_logo.png'
import react_logo from '../img/react_logo.png'

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
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={java_logo} alt='Java' style={{height: '40px', marginRight: '5px', marginBottom: '5px'}}/>
            <span>Java Spring + </span>
            <img src={react_logo} alt='React JS' style={{height: '30px', marginRight: '5px', marginBottom: '0px', marginLeft: '5px'}}/>
            <span>React JS</span>
          </Typography>
          <Button onClick={routeChangeToLogin} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
