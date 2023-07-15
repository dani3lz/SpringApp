import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { request, setAuthToken } from '../axios_helper'
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const paperStyle = { padding: '50px 50px', width: 350, margin: '200px auto' }
    const textFieldStyle = { width: '100%', margin: '10px auto' }
    const infoStyle = { width: '100%', margin: '10px auto', padding: '15px 0px 0px 0px' }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        request(
            "POST",
            "/auth/login",
            {
                email: email,
                password: password
            }
        ).then((response) => {
            setAuthToken(response.data.token);
            navigate('/');
        }).catch((error) => {
            console.error("Error sending data");

        });
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>LOGIN</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="email-input"
                        label="Email"
                        variant="outlined"
                        style={textFieldStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextField
                        id="password-input"
                        label="Password"
                        variant="outlined"
                        type="password"
                        style={textFieldStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClick}>Submit</Button>
                    <div style={infoStyle}>Don't have an account? <a href='/register'>Register here.</a></div>
                </Box>
            </Paper>
        </Container>
    );
}
