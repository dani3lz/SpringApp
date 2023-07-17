import React, { useState, useEffect } from 'react'
import { Container, Paper, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { request } from '../axios_helper'

function ProfileView() {

  const paperStyle = { padding: '50px 50px', marginTop: '60px', borderRadius: '30px' };
  const innerPaperStyle = { padding: '20px 30px', marginBottom: '50px', borderRadius: '30px' };
  const titleStyle = { float: 'left', fontSize: '22px', color: '#000', fontWeight: 'bold', marginTop: '0px' };
  const spanStyle = { float: 'left', fontSize: '19px', color: '#808080', marginBottom: '5px', fontWeight: '400' };
  const spanInfoStyle = { float: 'left', fontSize: '20px', color: '#000', fontWeight: '500' };
  const buttonStyle = { color: 'black', borderColor: '#dedede', borderRadius: '25px', float: 'right' };

  const [user, setUser] = useState([]);

  useEffect(() => {
    request(
      "GET",
      "/users/info",
      {}
    ).then((emailResponse) => {
      request(
        "GET",
        "/users/" + emailResponse.data,
        {}
      ).then((userResponse) => {
        setUser(userResponse.data)
      }).catch((error) => {
        console.error("Error getting user data");
      });
    }).catch((error) => {
      console.error("Error getting user email");
    });
  }, [])

  return (
    <Container style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle', maxWidth: '100%', width: '95%' }}>
      <Grid container columns={12} style={{ width: '100%', margin: '0' }}>
        <Grid item xs={3}>
          <Container style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle', maxWidth: '100%' }}>
            <Paper elevation={3} style={paperStyle}>
              <h2>Hi, {user.firstName}</h2>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={9}>
          <Container style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle', maxWidth: '100%' }}>
            <Paper elevation={3} style={paperStyle}>
              <Paper variant="outlined" style={innerPaperStyle}>
                <Grid container columns={12} style={{ width: '100%', margin: '0' }}>
                  <Grid item xs={10}>
                    <h3 style={titleStyle}>Personal Information</h3>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" style={buttonStyle} endIcon={<BorderColorIcon />}>Edit</Button>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>First Name</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>Last Name</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.firstName}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.lastName}</span>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>Email address</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>Phone</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.email}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.phone}</span>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                  <Grid item xs={12}>
                    <span style={spanStyle}>Birthday</span>
                  </Grid>
                  <Grid item xs={12}>
                    <span style={spanInfoStyle}>{user.birthday}</span>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                </Grid>
              </Paper>
              <Paper variant="outlined" style={innerPaperStyle}>
                <Grid container columns={12} style={{ width: '100%', margin: '0' }}>
                  <Grid item xs={10}>
                    <h3 style={titleStyle}>Address</h3>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" style={buttonStyle} endIcon={<BorderColorIcon />}>Edit</Button>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>Country</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanStyle}>City</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.country}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={spanInfoStyle}>{user.city}</span>
                  </Grid>
                  <Grid item xs={12}>&nbsp;</Grid>
                </Grid>
              </Paper>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfileView