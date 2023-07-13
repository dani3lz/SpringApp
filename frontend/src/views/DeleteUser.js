import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DeleteUser() {
    const paperStyle = { padding: '50px 50px', width: 350, margin: '200px auto' }
    const textFieldStyle = { width: '100%', margin: '10px auto' }

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/users/" + email, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }).then(()=>{
                navigate("/")
            })
            .catch((error) => {
                console.error("Error sending user data");
              });
    }

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>DELETE USER</h1>
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
                    <Button variant="contained" onClick={handleClick} style={{ background: 'red' }}>Delete</Button>
                </Box>
            </Paper>
        </Container>
    );
}
