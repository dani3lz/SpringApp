import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '../axios_helper'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function DeleteUserView() {
    const paperStyle = { padding: '50px 50px', width: 594, margin: '200px auto' }
    const textFieldStyle = { width: '100%', margin: '10px auto' }

    const location = useLocation();
    const { selectedRows } = location.state;
    const emailSelected = selectedRows[0].email;

    const [email, setEmail] = useState(emailSelected);
    const [confirmEmail, setConfirmEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
    };

    const handleClick = (e) => {
        e.preventDefault()
        if (confirmEmail === setConfirmEmail) {
            request(
                "DELETE",
                "/users/" + email,
                {}
            ).then((response) => {
                navigate('/admin');
            }).catch((error) => {
                console.error("Error deleting user");

            });
        } else {
            console.log("Email is not identical");
        }
    }

    const handleBackClick = (e) => {
        e.preventDefault()
        navigate(-1);
    }

    return (
        <Container>
            <Paper elevation={12} style={paperStyle}>
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
                        <h1 style={{ margin: 0 }}>DELETE USER</h1>
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
                    <Grid container spacing={1.5} columns={2} style={{ width: '100%', margin: "0" }}>
                        <Grid item xs={1}>
                            <TextField
                                id="email-input"
                                label="Email"
                                variant="outlined"
                                style={textFieldStyle}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onCut={handleChange}
                                onCopy={handleChange}
                                onPaste={handleChange}
                                InputProps={{
                                    readOnly: true,
                                }} />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                id="confirm-email-input"
                                label="Confirm email"
                                variant="outlined"
                                style={textFieldStyle}
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                onCut={handleChange}
                                onCopy={handleChange}
                                onPaste={handleChange} />
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleClick} style={{ background: 'red' }}>Delete</Button>
                </Box>
            </Paper>
        </Container>
    );
}
