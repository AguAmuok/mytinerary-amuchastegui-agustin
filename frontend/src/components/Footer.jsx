import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as LinkRouter } from "react-router-dom"
import Link from '@mui/material/Link';

function Footer() {
    return (
        <>
            <Box className='footer' sx={{
                backgroundColor: "black",
            }}>
                <Box className='botones-footer' sx={{
                    
                    color: 'white',
                    fontSize: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '1rem',
                }}>

                    <LinkRouter className='footer-link' to={'/'}>Home</LinkRouter>
                    <LinkRouter className='footer-link' to={'/Cities'}>Cities</LinkRouter>
                </Box>

                <Box sx={{
                    height: '7rem',
                    backgroundColor: 'black',
                    display: 'flex',
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <Link href="https://github.com/AguAmuok"><GitHubIcon sx={{color: 'white' , display: { xs: 'flex', ms: 'none' }, mr: 3 }} /></Link>
                    <Link href="https://www.linkedin.com/in/agustin-amuchastegui-526ab9ba/"><LinkedInIcon sx={{color: 'white' , display: { xs: 'flex', ms: 'none' }, mr: 3 }} /></Link>
                    <Link href="https://www.instagram.com/aguamu.ok"><InstagramIcon  sx={{ color: 'white', display: { xs: 'flex', ms: 'none' }, mr: 3 }} /></Link>                   
                    <Link href="https://twitter.com/AgussPiki"><TwitterIcon sx={{color: 'white' , display: { xs: 'flex', ms: 'none' }, mr: 3 }} /></Link>

                </Box>

                <Box sx={{
                    backgroundColor: 'rgb(18, 20, 21)',

                }}>
                    <Typography
                        className='all_reserver'
                        
                        noWrap
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Montserrat,sans-serif',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: 'rgb(204, 204, 204)',
                            textDecoration: 'none',
                            padding: '1rem',
                            fontSize:'1rem!important',
                            flexWrap: 'wrap'

                        }}>
                        © 2022 My Tinerary Inc | All rights reserved. By Amuchástegui Agustin
                    </Typography>
                    <Typography className='all_reserver_mobile'
                        variant="h5"
                        noWrap
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Montserrat,sans-serif',
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