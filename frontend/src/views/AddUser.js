import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
    const paperStyle = { padding: '50px 50px', width: 500, margin: '80px auto' }
    const fullTextFieldStyle = { width: '100%', margin: '10px auto' }
    const halfTextFieldStyle = { width: '100%', margin: '10px auto' }

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            const user = {
                email,
                password,
                firstName,
                lastName,
                birthday,
                phone,
                country,
                city
            }
            
            fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            }).then(()=>{
                navigate("/")
            })
            .catch((error) => {
                console.error("Error sending user data");
              });

        } else {
            console.log("Password not match.")
        }
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>ADD USER</h1>
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
                            <Button variant="contained" onClick={handleClick} style={{ width: '50%' }}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
