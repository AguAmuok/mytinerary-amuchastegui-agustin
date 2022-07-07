import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect } from 'react'
import Itinerary from './Itinerary';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/itinerariesActions';
import NoItinerary from '../components/NoItinerary'
import '../styles/styles.css'

export default function Detail() {

    const { id } = useParams() // devuelve un objeto clave, en este caso por ID
    const dispatch = useDispatch()

    useEffect(() => { //se ejecuta cuando el componente se renderiza por 1ra vez o cuando se actualiza
        dispatch(citiesActions.getOneCity(id))
        dispatch(itinerariesActions.getItinerariesByCity(id))
        //eslint-disable-next-line
    }, []);

    const itineraries = useSelector(store => store.itinerariesReducer.getItineraryByCity)
    // console.log(itineraries)

    const card = useSelector((store) => store.citiesReducer.oneCity)

    return (
        <>
            <Box key={card._id} sx={{
                flexGrow: 1,
                backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/231/5/291/palm-trees-sky-clouds-pink-wallpaper-7b56fced23016f0935d4cbe97d5ccc90.jpg)',
                backgrounSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex!important',
                justifyContent: 'center!important',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '3rem',
                minHeight: '61.4vh',

            }}>
                <Box>
                    <Card sx={{ maxWidth: 1200, color: 'white', backgroundColor: 'black', opacity:'95%', borderRadius: '2%' }}>
                        <CardActionArea>
                            <CardMedia className='card-details' sx={{ height: 300 }}
                                component="img"
                                image={card.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {card.name}
                                </Typography>
                                <Typography sx={{
                                    fontSize: '1rem!important'
                                }} variant="h6" color="white">
                                    {card.description}
                                </Typography>
                                <Button />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                </Box>
            
                <Box className='tinerary-card' sx={{
                backgroundColor: 'rgb(18, 20, 21)',    
                display: 'flex ',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center',
                p:'2rem'
                }}>

                <Typography variant='h3' sx={{color:'white'}}>
                    ACTIVITIES
                </Typography>

                {itineraries.length > 0 ? //leo el arreglo y si es mayor a 0 muestro los itinerarios
                    itineraries.map((itineraries, index) =>
                        <Itinerary  //traigo el componente Itinerary y le paso el map mediante props!
                            key={index}
                            title={itineraries.title}
                            userName={itineraries.userName}
                            userPic={itineraries.userPic}
                            description={itineraries.description}
                            price={itineraries.price}
                            duration={itineraries.duration}
                            hashtag={itineraries.hashtag} // con el operador ternario muestro las citys sin itinerarios
                            likes={itineraries.likes}
                            activitiesId={itineraries.activitiesId}
                            id={itineraries._id}
                            />) : <NoItinerary />}
            </Box> 
        </>
    );
}


