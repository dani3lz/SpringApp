import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { request } from '../axios_helper'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function EditUserView() {
    const paperStyle = { padding: '50px 50px', width: 500, margin: '80px auto' }
    const fullTextFieldStyle = { width: '100%', margin: '10px auto' }
    const halfTextFieldStyle = { width: '100%', margin: '10px auto' }

    const navigate = useNavigate();

    const location = useLocation();
    const { selectedRows } = location.state;
    const emailSelected = selectedRows[0].email;

    const [firstName, setFirstName] = useState(selectedRows[0].firstName);
    const [lastName, setLastName] = useState(selectedRows[0].lastName);
    const [email, setEmail] = useState(selectedRows[0].email);
    const [birthday, setBirthday] = useState(selectedRows[0].birthday);
    const [phone, setPhone] = useState(selectedRows[0].phone);
    const [country, setCountry] = useState(selectedRows[0].country);
    const [city, setCity] = useState(selectedRows[0].city);

    const handleClick = (e) => {
        e.preventDefault()
        request(
            "PUT",
            "/users/" + emailSelected,
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                phone: phone,
                country: country,
                city: city
            }
        ).then((response) => {
            navigate('/admin');
        }).catch((error) => {
            console.error("Error sending data");

        });
    }

    const handleBackClick = (e) => {
        e.preventDefault()
        navigate(-1);
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Grid container spacing={0} columns={3} style={{ width: '100%', margin: "0", marginBottom: '15px' }}>
                    <Grid item xs={1}>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="paper"
                            style={{ float: 'left' }}
                            sx={{ mr: 2 }}
                            onClick={handleBackClick}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <h1 style={{ margin: 0 }}>EDIT USER</h1>
                    </Grid>
                </Grid>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={1.5} columns={24} style={{ width: '100%', margin: "0" }}>
                        <Grid item xs={24}>
                            <TextField
                                id="email-input"
                                label="Email"
                                variant="outlined"
                                style={fullTextFieldStyle}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="first-name-input"
                                label="First name"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="last-name-input"
                                label="Last name"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="birthday-input"
                                label="Birthday"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phone-input"
                                label="Phone"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="country-input"
                                label="Country"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="city-input"
                                label="City"
                                variant="outlined"
                                style={halfTextFieldStyle}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={24}>
                            <Button variant="contained" onClick={handleClick} style={{ width: '50%' }}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
