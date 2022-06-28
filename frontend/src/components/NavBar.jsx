import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '../styles/styles.css'
import logo from '../images/logo_largo.png'
import {Link as LinkRouter} from "react-router-dom"


const pages = [{ to:'/' , name: 'Home' } , {  to:'/Cities' , name:'Cities'}];
const settings = [{to: '/SignUp', name:'Sign Up'} , {to:'/SignIn' , name:'Sign In'}];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black', Height:'12vh'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            
                        >
                            {pages.map((page,index) => (
                                <LinkRouter to={page.to} key={index} onClick={handleCloseNavMenu}>
                                    <MenuItem style={{backgroundColor: 'black'}}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                                </LinkRouter>
                            ))}
                                
                                
                        </Menu>
                    </Box>
                    <LinkRouter to='/'>             
                    <img className='logo' src={logo} alt='' href="index.html" />
                    </LinkRouter>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', mx: 'none' }, mr: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
                        {pages.map((page,index) => (
                            <LinkRouter to={page.to} key={index} >
                            <Button 
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                            >{page.name}
                            </Button>
                            </LinkRouter>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src="https://mpng.subpng.com/20190209/zcj/kisspng-computer-icons-clip-art-portable-network-graphics-islamic-boarding-school-5c5f3724df3f17.1898313715497439089144.jpg" />

                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting,index) => (  
                                <LinkRouter to={setting.to} key={index} onClick={handleCloseUserMenu} >                    
                                <MenuItem >
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                                </LinkRouter>
                                
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
