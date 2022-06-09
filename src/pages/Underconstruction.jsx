import React from 'react'
import Box from '@mui/material/Box';

export default function Underconstruction() {
    return (

        <>
        <Box className='pagconstruction' sx={{
            minHeight:  '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

        <img className='logolargo' src= {require('../images/logo_large.png') } alt='' /> 

        </Box>
        </>
    )
}
