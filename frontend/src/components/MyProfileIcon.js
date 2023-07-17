import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuthToken, deleteAuthToken, checkAuthToken } from '../axios_helper'
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeChangeToLogout = () => {
    deleteAuthToken();
    navigate(`/`);
  }

  const routeChangeToMyProfile = () => {
    navigate(`/profile`);
  }

  const routeChangeToAdminDashboard = () => {
    navigate(`/admin`);
  }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const isAdmin = () => {
    const jwtToken = getAuthToken();
    const isLoggedIn = jwtToken !== null && jwtToken !== "null";
    if (isLoggedIn && parseJwt(jwtToken).roles[0] === "ROLE_ADMIN") {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (checkAuthToken()) {
      const token = getAuthToken();
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        deleteAuthToken();
        navigate(`/`);
        console.log("Expired.")
      }
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="My Account">
          <IconButton
            onClick={handleClick}
            size="large"
            color="inherit"
            edge="start"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={routeChangeToMyProfile}>
          My profile
        </MenuItem>
        {isAdmin() &&
          <MenuItem onClick={routeChangeToAdminDashboard}>
            Dashboard
          </MenuItem>}
        <Divider />
        <MenuItem onClick={routeChangeToMyProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={routeChangeToLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}