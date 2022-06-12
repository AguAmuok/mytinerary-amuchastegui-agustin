import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {useState} from 'react';
import { Link as LinkRouter } from "react-router-dom"
import fotos from '../components/Location'

export default function TitlebarImageList() {
    const [ cities, setcities] = useState([])
    const [ search, setSearch]= useState('')
    
    useEffect(() =>{
        setcities(fotos)

    let city=fotos.filter(foto => foto.nombre.toLowerCase().startsWith(search.trim().toLowerCase())) 
    setcities(city)   
    },[search])


return (
<>
<Box sx={{
        
        backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
        backgrounSize: 'cover',
        
        backgroundPosition: 'center'    
        
    }}>

<Box className='input' sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem'
    }}>

    <input type="Stext" 
        placeholder='Search...'
        onKeyUp={(e) =>{
            setSearch(e.target.value)
        }}
    />

    </Box>

    <ImageList sx={{ width: '100%', padding:'2rem',  height: '100%'}}>
    <ImageListItem key="Subheader" cols={2}>
        {/* <ListSubheader component="div">December</ListSubheader> */}
    </ImageListItem>
        {cities.map((item) => (
        <ImageListItem key={item.url}>
        <img
            src={`${item.url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.nombre}
            loading="lazy"
        />
        <ImageListItemBar
            title={item.nombre}
            subtitle={item.nombre}
            actionIcon={
                <LinkRouter to={ `/City/${item.id}`} >
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.nombre}`}
            >
                <InfoIcon  />
            </IconButton>
            </LinkRouter> 
            }
        />
        </ImageListItem>
    ))}
    </ImageList>
    </Box>
    </>
    );
}







    
    

