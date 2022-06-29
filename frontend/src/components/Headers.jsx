import React from 'react'
import '../styles/styles.css'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
 import { Link as LinkRouter } from "react-router-dom"

function Headers() {
    
    
    return (
        <>
        <Box className='header' sx={{
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            flexDirection: 'column',
            height:'100vh'
        }} >
            
            <img className='logolargo' src= {require('../images/logo_largo.png') } alt='' /> 
        
        <Typography className='slogan'
                    variant="h5"                                        
                    sx={{   
                                        
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        display: { xs: 'flex', md: 'flex', ml:'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        letterSpacing: '.3rem',
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: '1rem',                        
                    }}> 
                    Find your perfect trip, designed by insiders who know and love their cities!
            
                    </Typography>                       
                    <LinkRouter to='/Cities' className='button-85' sx={{
                        color: 'white'
                    }}>¡ Click here for see more !</LinkRouter>
                            
        </ Box >               
        </>
    )
}
export default Headers