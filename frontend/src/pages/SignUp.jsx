import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import GoogleButton from 'react-google-button'
// import { FacebookLoginButton } from "react-social-login-buttons";
import '../styles/styles.css'
import CountrySelect from '../components/CountrySelect';
import { useDispatch} from 'react-redux';
import userActions from '../redux/actions/userAction';
import {useState} from 'react';
import GoogleSignUp from '../components/GoogleSignUp';


const theme = createTheme();

export default function SignUp() {
    const [nameUser,setNameUser]= useState("");
    const [lastNameUser,setLastNameUser]= useState("");
    const [photoUser,setPhotoUser]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event)
        const userData = {
            
            nameUser: nameUser,
            lastNameUser: lastNameUser,
            photoUser: photoUser,
            email: email,
            country: event.target[10].value,
            from: "SignUpForm",
            password: password,
        }

        console.log(userData)
        dispatch(userActions.signUp(userData))  
        
        setNameUser("")
        setLastNameUser("")
        setPassword("")
        setEmail("")
        setPhotoUser("")
        //setFrom("")
    
};

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'rgb(192, 75, 128)' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={e=>setNameUser(e.target.value)}
                                    value={nameUser}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={e=>setLastNameUser(e.target.value)}
                                    value={lastNameUser}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e=>setEmail(e.target.value)}
                                    value={email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e=>setPhotoUser(e.target.value)}
                                    value={photoUser}
                                    required
                                    fullWidth
                                    id="email"
                                    label="PhotoUser URL:"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e=>setPassword(e.target.value)}
                                    value={password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                
                                <CountrySelect/>
                            </Grid>                        
                        </Grid>
                        <Button
                            className='sign'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Sign Up
                        </Button>
                        <GoogleSignUp/>

                        {/* <Grid sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                            <GoogleButton className='sign' label='Sign Up with Google'
                                onClick={() => { console.log('Google button clicked') }} /></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}> */}
                            {/* <FacebookLoginButton className='facebook' onClick={() => { console.log('Facebook button clicked') }}>
                                <span>Sign up with Facebook</span>
                            </FacebookLoginButton> */}
                        {/* </Grid> */}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

