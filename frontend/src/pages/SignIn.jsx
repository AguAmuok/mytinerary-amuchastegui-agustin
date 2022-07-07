import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { FacebookLoginButton } from "react-social-login-buttons";
import '../styles/styles.css';
import { useDispatch} from 'react-redux';
import userActions from '../redux/actions/userAction';
import {useState} from 'react';
import {Link as LinkRouter} from "react-router-dom"
import GoogleSignIn from '../components/GoogleSignIn'
import {useNavigate} from 'react-router-dom'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <LinkRouter className='links' to="/">
                MyTinerary
            </LinkRouter>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function SignInSide() {
    
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {//funcion en async
        event.preventDefault();
        const userLogin = {
            email: email,
            password: password,
            from: "SignUpForm",
    }
    
    await dispatch(userActions.signIn(userLogin))// paso await para que espere el ingreso del user
    
    const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
    if (token) {// si esta el token lo redirecciono al Navigate
        navigate("/")
    }  

    setEmail("")
    setPassword("")
    }
    
    return (
        <Box sx={{ backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/875/239/803/nature-sunset-sun-beach-wallpaper-696048dd818aad5b46d7986f100116ad.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center'}}>

        
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ minHeight: '60.7vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={2}
                    md={7}                   
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'rgb(192, 75, 128)' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                            className='sign'
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Grid sx={{ display: 'flex', justifyContent: 'center', margin:'1rem'}}>
                            <GoogleSignIn/>
                            </Grid>
                            {/* <Grid sx={{display: 'flex', justifyContent: 'center', margin: '1rem'}}>
                            <FacebookLoginButton className='facebook' onClick={() => { console.log('Facebook button clicked') }}>
                            <span>Sign In with Facebook</span>
                            </FacebookLoginButton>
                            </Grid> */}

                            <Grid container>
                                <Grid item xs>
                                    <LinkRouter className='links' to="/SignUp" variant="body2">
                                        Forgot password?
                                    </LinkRouter>
                                </Grid>
                                <Grid item>
                                <LinkRouter className='links' to="/SignUp" variant="body2">
                                        Don't have an account? Sign Up
                                </LinkRouter>   
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt:4 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
        </Box>
    );
}




// export default function SignInSide() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const userData(event.target[3].value)
//         const userData = {
//             nameUser: event.target[0].value,
//             lastNameUser: event.target[1].value,
//             password: event.target[2].value,
//             email: event.target[3].value,
//         }
//         props.singUpUsers(userData)
//     };


//ORIGINAL

// export default function SignInSide() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//     };