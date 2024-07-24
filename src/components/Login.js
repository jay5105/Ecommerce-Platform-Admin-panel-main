import * as React from 'react';
import { Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Grid, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Show/hide Password
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post("http://localhost:5000/Admin/Login", values)
            .then((response) => {
                // handle success
                console.log(response.data.token);
                navigate("/admin/");
                localStorage.setItem("Token", response.data.token);
                setLoading(false);
            })
            .catch((error) => {
                // handle error
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container justifyContent="center" padding="50px 0px">
                    <Grid item sm={8} xs={12}>
                        <Box textAlign="center" paddingBottom="18px">
                            <Typography component="a" href='#Ggf' sx={{ textDecoration: "none", display: "inline-block" }}>
                                <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                                    <img
                                        src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png"
                                        alt="NiceAdminlogo"
                                        width="25px"
                                        height="25px"
                                    />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        className='nunito-sans'
                                        fontWeight={700}
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', md: 'flex' },
                                            fontFamily: '"Nunito", sans-serif',
                                            fontSize: "24px",
                                            color: "#012970",
                                            textDecoration: 'none',
                                        }}
                                    >
                                        MintMart
                                    </Typography>
                                </Stack>
                            </Typography>
                        </Box>
                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" className='nunito-sans' color="#012970">
                                    Login to Your Account
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px">
                                    Enter your username & password to login
                                </Typography>
                                <form onSubmit={handleLogin}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Username</FormLabel>
                                            <TextField
                                                type='text'
                                                size='small'
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Password</FormLabel>
                                            <OutlinedInput
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                size='small'
                                            />
                                        </FormControl>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox disableRipple />
                                            <Typography>
                                                Remember me
                                            </Typography>
                                        </Stack>
                                        <Button type="submit" variant="contained" sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#0d6efd" }} disabled={loading}>
                                            {loading ? <CircularProgress size={24} /> : "Login"}
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Login;
