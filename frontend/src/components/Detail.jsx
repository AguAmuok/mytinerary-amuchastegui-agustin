import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect} from 'react'
import axios from 'axios'


export default function Detail() {

    const {id} = useParams()
    
    const [card , setCity] = useState([])

    useEffect (() => {
        axios.get(`http://localhost:4000/api/cities/${id}`)
        .then( resp => setCity(resp.data.response.city))},[]) 
        

        return (         

        <Box  key={card._id} sx={{
        
            backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
            backgrounSize: 'cover',
            backgroundPosition: 'center',    
            display:'flex!important',
            justifyContent: 'center!important',
            alignItems: 'center',
            padding: '3rem',
            minHeight:  '61.4vh'

        }}>
            <Box>
        <Card sx={{ maxWidth: 1000, color:'white' , backgroundColor: 'black'}}>
            <CardActionArea>
                <CardMedia sx={{height: 300}}                  
                    component="img"                                       
                    image={card.image}                                                         
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                        
                    </Typography>
                    <Typography sx={{
                        fontSize:'1rem!important'
                    }} variant="h6" color="white">
                    <p>{card.description}</p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Box>
        </Box> 
        );
}
    


