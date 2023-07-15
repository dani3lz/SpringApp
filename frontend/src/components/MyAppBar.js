import React, { useEffect } from 'react';
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
import { getAuthToken, deleteAuthToken } from '../axios_helper'

export default function MyAppBar() {

  let navigate = useNavigate();

  const routeChangeToLogin = () => {
    navigate(`/login`);
  }
  const routeChangeToHome = () => {
    navigate(`/`);
  }
  const routeChangeToLogout = () => {
    deleteAuthToken();
    navigate(`/`);
  }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        deleteAuthToken();
        navigate(`/`);
        console.log("Expired.")
      }
    }
  }, [navigate]);

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
            <img src={java_logo} alt='Java' style={{ height: '40px', marginRight: '5px', marginBottom: '5px' }} />
            <span>Java Spring + </span>
            <img src={react_logo} alt='React JS' style={{ height: '30px', marginRight: '5px', marginBottom: '0px', marginLeft: '5px' }} />
            <span>React JS</span>
          </Typography>
          {getAuthToken() !== null && getAuthToken() !== "null"
            ? <Button onClick={routeChangeToLogout} color="inherit">Logout</Button>
            : <Button onClick={routeChangeToLogin} color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
