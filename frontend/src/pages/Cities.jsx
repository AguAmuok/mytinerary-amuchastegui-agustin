import React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import {useState} from 'react';
import NotFound from '../components/NotFound';
import Cards from '../components/Cards';
import citiesActions from '../redux/actions/citiesActions';
import {useDispatch, useSelector} from 'react-redux'



function Cities(props) {
    // const [cities, setCities] = useState([]) 
    const [search, setSearch] = useState('')
    const dispatch = useDispatch() 

    useEffect (() => { 
        dispatch(citiesActions.filterCities(search))
        //eslint-disable-next-line
    },[search]);

    const city = useSelector(store => store.citiesReducer.filter)


return (
<>

<Box sx={{       
        backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
        backgrounSize: 'cover',        
        backgroundPosition: 'center'
        }}>

<Box className='input' sx={{display: 'flex', justifyContent: 'center', padding: '2rem', height: '6rem'        
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

export default Cities


// useEffect(() => { 
    //     axios.get("http://localhost:4000/api/cities") 
    //     .then(response => setCities(response.data.response.cities) 
    // )},[])

        // let city = props.cities?.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))
