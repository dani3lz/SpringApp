import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Grid } from '@mui/material';
import { request } from '../axios_helper'
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";


function RegisterView() {
    const paperStyle = { padding: '50px 50px', width: 500, margin: '80px auto' }
    const fullTextFieldStyle = { width: '100%', margin: '10px auto' }
    const halfTextFieldStyle = { width: '100%', margin: '10px auto' }
    const infoStyle = { width: '100%', margin: '10px auto', padding: '15px 0px 0px 0px' }
    const selectHalfTextFieldStyle = { width: '100%', margin: '10px auto', textAlign: 'left' }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [countries, setCountries] = useState([]);
    const [birthdayPicker, setBirthdayPicker] = useState('');
    const [userPhoneCode, setUserPhoneCode] = useState('');

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        request(
            "GET",
            "/users/countries",
            {}
        ).then((response) => {
            setCountries(response.data)
        }).catch((error) => {
            console.error("Error fetching users");
            setCountries([]);
        });
    }, [])

    const handleCountrySelect = (e) => {
        setCountry(e);
        const code = countries.filter(c => { return c.nicename === e }).map(result => result.phonecode).toString();
        if (code !== null) {
            setUserPhoneCode(code)
        };
    }

    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function checkFields() {
        let birthday = "";
        if (birthdayPicker instanceof moment) {
            const day = birthdayPicker._d.getDate();
            const month = birthdayPicker._d.getMonth() + 1;
            const year = birthdayPicker._d.getFullYear();
            const date = day + "-" + month + "-" + year
            birthday = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY")
        }

        const fields = [
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            birthday,
            phone,
            country,
            city
        ]

        let result = true;
        setErrorSnackBar(false);
        result = fields.every(element => {
            if (element.trimStart().trimEnd().length === 0) {
                setErrorMessage("All fields are required.");
                setErrorSnackBar(true);
                return false;
            }
            return true;
        });

        if (!result) {
            return [false, []];
        }

        result = fields.every(element => {
            let trimString = element.trimStart();
            if (trimString !== element) {
                setErrorMessage("Fields cannot have whitespaces at the beginning.");
                setErrorSnackBar(true);
                return false;
            }
            return true;
        });

        if (!result) {
            return [false, []];
        }

        const regexPassword = new RegExp("(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
        if (password.length < 8 || password.indexOf(' ') >= 0 || !regexPassword.test(password)) {
            setErrorMessage("Password should have at least 8 characters, one letter and one number.");
            setErrorSnackBar(true);
            return [false, []];
        }
        if (password !== confirmPassword) {
            setErrorMessage("Confirm Password doesn't match Password.");
            setErrorSnackBar(true);
            return [false, []];
        }
        if (!errorSnackBar) {
            const newUser = {
                email: email.trimStart().trimEnd(),
                password: password,
                firstName: firstName.trimStart().trimEnd(),
                lastName: lastName.trimStart().trimEnd(),
                birthday: birthday,
                phone: "+(" + userPhoneCode + ")" + phone.trimStart().trimEnd(),
                country: country,
                city: city.trimStart().trimEnd()
            }
            return [true, newUser];
        } else {
            setErrorSnackBar(true);
            return [false, []];
        }

    }

    const handleClick = (e) => {
        e.preventDefault()
        const resultCheck = checkFields();
        if (resultCheck[0]) {
            request(
                "POST",
                "/auth/register",
                JSON.stringify(resultCheck[1])
            ).then((response) => {
                navigate('/login');
            }).catch((error) => {
                console.error("Error sending data");
            });
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Birthday"
                                        value={birthdayPicker || null}
                                        format="DD-MM-YYYY"
                                        openTo="year"
                                        views={["year", "month", "day"]}
                                        style={halfTextFieldStyle}
                                        onChange={(e) => setBirthdayPicker(e)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-country"
                                select
                                label="Country"
                                defaultValue=""
                                style={selectHalfTextFieldStyle}
                                onChange={(e) => handleCountrySelect(e.target.value)}
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.nicename} value={option.nicename}>{option.nicename}</MenuItem>
                                ))}
                            </TextField>
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
                                label="Phone"
                                id="outlined-start-adornment-phone"
                                style={halfTextFieldStyle}
                                value={phone}
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment:
                                        userPhoneCode === ""
                                            ? null
                                            : <InputAdornment position="start">+({userPhoneCode})</InputAdornment>
                                    ,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '25ch' }}
                                variant="outlined"
                                style={halfTextFieldStyle}
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
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '25ch' }}
                                variant="outlined"
                                style={halfTextFieldStyle}
                                onChange={(e) => setConfirmPassword(e.target.value)}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={24}>
                            <Button variant="contained" onClick={handleClick} style={{ width: '50%' }}>Submit</Button>
                            {
                                <Snackbar open={errorSnackBar} autoHideDuration={10000} style={{width: 'fit-content'}} onClose={() => setErrorSnackBar(false)}>
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                        {errorMessage}
                                    </Alert>
                                </Snackbar>
                            }
                        </Grid>
                    </Grid>
                    <div style={infoStyle}>Already have an account? <a href='/login'>Login here.</a></div>
                </Box>
            </Paper>
        </Container>

    )
}

export default RegisterView