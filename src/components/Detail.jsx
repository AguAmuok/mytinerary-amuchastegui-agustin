import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

// import Box from '@mui/material/Box';
import fotos from './Location'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function Detail() {

    const {id} = useParams()
    const [card, setCard] = useState(fotos.filter(dato => dato.id == id))
            console.log(setCard)

    return (
        card.map((event) =>

        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia                   
                    component="img"
                    height="140"
                    image={event.url}                   
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>)
    );
}
    


