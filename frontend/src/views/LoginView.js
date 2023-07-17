import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { request, setAuthToken } from '../axios_helper'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function LoginView() {
    const paperStyle = { padding: '50px 50px', width: 350, margin: '200px auto' }
    const textFieldStyle = { width: '100%', margin: '10px auto' }
    const infoStyle = { width: '100%', margin: '10px auto', padding: '15px 0px 0px 0px' }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function checkFields() {
        const fields = [
            email,
            password
        ]

        let result = true;
        setErrorSnackBar(false);
        result = fields.every(element => {
            if (element.trimEnd().trimStart().length === 0) {
                setErrorMessage("All fields are required.");
                setErrorSnackBar(true);
                return false;
            }
            return true;
        });

        if (!result) {
            return false;
        }
        return true;
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (checkFields()) {
            request(
                "POST",
                "/auth/login",
                {
                    email: email,
                    password: password
                }
            ).then((response) => {
                if (response.ok) {
                    setAuthToken(response.data.token);
                    navigate('/');
                } else {
                    setErrorMessage(response.data.message);
                    setErrorSnackBar(true);
                }
            }).catch((error) => {
                setErrorMessage("Incorrect email or password.");
                setErrorSnackBar(true);
            });
        }
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
                    <FormControl sx={{ m: 1, width: '25ch' }}
                        variant="outlined"
                        style={textFieldStyle}
                        onChange={(e) => setPassword(e.target.value)}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button variant="contained" onClick={handleClick}>Submit</Button>
                    {
                        <Snackbar open={errorSnackBar} autoHideDuration={10000} style={{width: 'fit-content'}} onClose={() => setErrorSnackBar(false)}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    }
                    <div style={infoStyle}>Don't have an account? <a href='/register'>Register here.</a></div>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginView