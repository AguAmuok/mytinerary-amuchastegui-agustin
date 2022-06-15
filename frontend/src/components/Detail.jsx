import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

// import Box from '@mui/material/Box';
import picture from './Location'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';


export default function Detail() {

    const {id} = useParams()
    const [card] = useState(picture.filter(dato => dato.id === parseInt(id)))
            

    return (
        card.map((event,index)  =>   
        <Box  key={index} sx={{
        
            backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
            backgrounSize: 'cover',
            backgroundPosition: 'center',    
            display:'flex!important',
            justifyContent: 'center!important',
            alignItems: 'center',
            padding: '3rem'

        }}>
        <Card sx={{ maxWidth: 1000,  color:'white' , backgroundColor: 'black'}}>
            <CardActionArea>
                <CardMedia                   
                    component="img"
                    height="338"                    
                    image={event.image}                                                         
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card></Box> 
        )
    );
}
    


