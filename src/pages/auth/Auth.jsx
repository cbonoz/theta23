import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container, Divider, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import Input from './Input';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import authheader from '../../assets/authheader.png';

const initialState = { firstName: '', lastName: '', userName: '', email: '', country: '', password: '', confirmPassword: ''};

const Auth = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(res?.credential);

    try {
        dispatch({ type: 'AUTH', data: { token, result }});

        navigate('/transactions');
    } catch (error) {
        console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("error");
  };

  const themeLanding = createTheme({
    palette: {
      background: {
        default: "#b3dee3"
      },
      primary: {
        main: '#63b7db'
      },
    }
  });

  return (
    <div>
      <ThemeProvider theme={themeLanding}>
      <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ borderRadius: 3, mt: 15}} align="center">
            <img src={authheader} alt="logo" width={300} height={147}/>
            <Typography variant="h6" color="textSecondary">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={0.7} style={{width: "300px"}}>
                {
                  isSignup && (
                    <>
                      <Input name="firstName" label="First Name" handleChange={handleChange} half />
                      <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                      <Input name="userName" label="Username" handleChange={handleChange} />
                      <Input name="country" label="Country" handleChange={handleChange} />
                    </>
                  )}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  <Input name="password" label="Password" autocomplete="on" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                  { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                  <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 3, mb: 2}}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                  </Button>
              </Grid>
              <Divider variant="middle" />
              <Grid sx={{mt: 3, mb: 1}} style={{width: "300px"}}>
                <GoogleLogin 
                          onSuccess={googleSuccess}
                          onError={googleFailure}
                          cookiePolicy="single_host_origin"
                />
              </Grid>
              <Grid container align="center" justify="center">
                <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                    </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  )
};

export default Auth;