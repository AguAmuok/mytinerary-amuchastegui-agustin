import React from 'react'
import Box from '@mui/material/Box';


function NotFound()  {
    return (
    <Box sx={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight:  '51.2vh'
    }}> 
        <img className='notFound' src= {require('../images/notFound.png')} alt='notFound'/>
    </Box>
    )
}

export default NotFound