import React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios'
import NotFound from '../components/NotFound';
import Cards from '../components/Cards';


export default function TitlebarImageList() {
    const [cities, setCities] = useState([]) //useState asigna un valor inicial vacio
    const [search, setSearch] = useState('') //useState asigna un valor inicial vacio

    useEffect(() => { //Hook de estado,, Actualiza el título del documento usando la API del navegador
        axios.get("http://localhost:4000/api/cities") //con el metodo GET de axios obtenemos los datos de nuestra URL
        .then(response => setCities(response.data.response.cities)  //esperamos una respuesta
    )},[])

    let city=cities?.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))
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
        padding: '2rem',
        height: '6rem'        
    }}>

    <input type="text" 
        placeholder='Search...'
        onKeyUp={(e) =>{setSearch(e.target.value)}}
    /> 

    </Box>
    
    <Box>
        {city?.length > 0 ? (<Cards cardFilter={city}/>) : (<NotFound/>)}
    </Box>   
    </Box>
    </>
    );
}