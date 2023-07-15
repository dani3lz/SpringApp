import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Grid } from '@mui/material';
import { request, setAuthToken } from '../axios_helper'
import { useNavigate } from 'react-router-dom';


function RegisterView() {
  const paperStyle = { padding: '50px 50px', width: 500, margin: '80px auto' }
    const fullTextFieldStyle = { width: '100%', margin: '10px auto' }
    const halfTextFieldStyle = { width: '100%', margin: '10px auto' }
    const infoStyle = { width: '100%', margin: '10px auto', padding: '15px 0px 0px 0px' }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            request(
                "POST",
                "/auth/register",
                {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    phone: phone,
                    country: country,
                    city: city
                }
            ).then((response) => {
                setAuthToken(response.data.token);
                navigate('/');
            }).catch((error) => {
                console.error("Error sending data");
            });
        } else {
            console.log("Password not match.")
        }
    }
  return (
    <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>REGISTER</h1>
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
                        <Grid item xs={12}>
                            <TextField
                                id="password-input"
                                label="Password"
                                variant="outlined"
                                type="password"
                                style={halfTextFieldStyle}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="confirm-password-input"
                                label="Confirm password"
                                variant="outlined"
                                type="password"
                                style={halfTextFieldStyle}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={24}>
                            <Button variant="contained" onClick={handleClick} style={{ width: '50%' }}>Submit</Button>
                        </Grid>
                    </Grid>
                    <div style={infoStyle}>Already have an account? <a href='/login'>Login here.</a></div>

                </Box>
            </Paper>
        </Container>
  )
}

export default RegisterView