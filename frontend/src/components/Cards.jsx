import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link as LinkRouter } from "react-router-dom"
import Box from '@mui/material/Box';


function Cards({cardFilter}) {
    return (
        <>        
        <Box sx={{
            minHeight: '51.2vh'
        }}>
        
        <ImageList sx={{marginLeft:'5%', gap:'30px!important', width: '90%', padding:'2rem' }}>
        <ImageListItem key="Subheader" cols={2}>
            
        </ImageListItem>
                
            {cardFilter.map((city) => (
            <ImageListItem key={city.image}>
            <img 
                src={`${city.image}?w=248&fit=crop&auto=format`}
                srcSet={`${city.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={city.name}
                style={{height:'20rem'}}
                />
            
            <ImageListItemBar
                title={city.name}
                subtitle={city.country}
                actionIcon={
                    <LinkRouter to={ `/City/${city._id}`} >
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)'}}
                    aria-label={`info about ${city.name}`}>
                    <InfoIcon fontSize="large" />
                </IconButton>
                </LinkRouter> 
                }
            />
            </ImageListItem>
        ))}
        </ImageList>
        
        </Box>      
        </>    
    )
}

export default Cards