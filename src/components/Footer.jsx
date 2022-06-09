import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as LinkRouter } from "react-router-dom"

function Footer() {
    return (
        <>
            <Box className='footer'>
                <Box className='botones-footer' sx={{
                    backgroundColor: "black",
                    color: 'white',
                    fontSize: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '1rem'
                }}>

                    <LinkRouter className='footer-link' to={'/'}>Home</LinkRouter>
                    <LinkRouter className='footer-link' to={'/Underconstruction'}>Cities</LinkRouter>
                </Box>

                <Box sx={{
                    height: '7rem',
                    backgroundColor: 'black',
                    display: 'flex',
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>

                    <InstagramIcon sx={{ display: { xs: 'flex', ms: 'none' }, mr: 3 }} />
                    <FacebookIcon sx={{ display: { xs: 'flex', ms: 'none' }, mr: 3 }} />
                    <TwitterIcon sx={{ display: { xs: 'flex', ms: 'none' }, mr: 3 }} />
                </Box>

                <Box sx={{
                    backgroundColor: 'rgb(18, 20, 21)',

                }}>
                    <Typography
                        className='all_reserver'
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: 'rgb(204, 204, 204)',
                            textDecoration: 'none',
                            padding: '1rem',

                        }}>
                        © 2022 My Tinerary Inc | All rights reserved.
                    </Typography>
                    <Typography className='all_reserver_mobile'
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'rgb(204, 204, 204)',
                            textDecoration: 'none',
                            padding: '1rem'
                        }}
                    >
                        My Tinerary | All rights reserved
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
export default Footer