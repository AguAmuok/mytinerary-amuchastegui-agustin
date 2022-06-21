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
import Itinerary from './Itinerary';
import Button from '../components/Button';


export default function Detail() {

    const {id} = useParams() //Hooks useParams traemos el parametro de la ruta por su /:id desde la API generando nuestra ruta dinamitca
    
    const [card , setCity] = useState([]) //useState asigna un valor inicial vacio

    useEffect (() => { //Hook de estado,, Actualiza el título del documento usando la API del navegador
        axios.get(`http://localhost:4000/api/cities/${id}`) //axios.get obtenemos los datos de nuestra URL 
        .then( resp => setCity(resp.data.response.city))},) //metodo  then y catch capturar la respuesta del servidor así como los errores
        //utulizamos el controlador de getOneCity para filtrar  una sola ciudad
        

        return (         
            <>
        <Box  key={card._id} sx={{
        
            backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
            backgrounSize: 'cover',
            backgroundPosition: 'center',    
            display:'flex!important',
            justifyContent: 'center!important',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3rem',
            minHeight:  '61.4vh'

        }}>
            <Box>
        <Card sx={{ maxWidth: 1500, color:'white' , backgroundColor: 'black'}}>
            <CardActionArea>
                <CardMedia sx={{ height: 300, Width:1500}}                  
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
                    {card.description}
                    </Typography>
                    
                    <Button/>
                
                </CardContent>
            </CardActionArea>
        </Card>
        </Box>
        <Itinerary/>
        </Box> 
        
        </>
        );
}
    


