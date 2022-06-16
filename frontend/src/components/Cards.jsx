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
        <ImageList sx={{marginLeft:'5%', gap:'30px!important', width: '90%', padding:'2rem'}}>
        <ImageListItem key="Subheader" cols={2}>
            
        </ImageListItem>
    
    
            {cardFilter.map((item) => (
            <ImageListItem key={item.image}>
            <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                style={{height:'20rem',
                }}
                
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
        </>
    
    )
}

export default Cards