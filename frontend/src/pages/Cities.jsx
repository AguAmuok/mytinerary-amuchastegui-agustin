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
import axios from 'axios'


export default function TitlebarImageList() {
    const [cities, setCities] = useState([])
    const [search, setSearch] = useState('')   

    useEffect(() => {
        axios.get("http://localhost:4000/api/cities")
        .then(response => {console.log(response)

    let city=response.data.response.cities.filter(foto => foto.name.toLowerCase().startsWith(search.trim().toLowerCase())) 
    setCities(city)}  
    )},[search])

return (
<>
{cities && <>
<Box sx={{
        
        backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
        backgrounSize: 'cover',        
        backgroundPosition: 'center'
        }}>


<Box className='input' sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        height: '6rem'        
    }}>

    <input type="text" 
        placeholder='Search...'
        onKeyUp={(e) =>{setSearch(e.target.value)}}
        

    />

    </Box>

    <ImageList sx={{marginLeft:'5%', gap:'30px!important', width: '90%', padding:'2rem'}}>
    <ImageListItem key="Subheader" cols={2}>
        {/* <ListSubheader component="div">December</ListSubheader> */}
    </ImageListItem>


        {cities.map((item) => (
        <ImageListItem key={item.image}>
        <img
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            
        />

        <ImageListItemBar
            title={item.name}
            subtitle={item.country}
            actionIcon={
                <LinkRouter to={ `/City/${item._id}`} >
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)'}}
                aria-label={`info about ${item.name}`}
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
    </> }
    </>
    );
}