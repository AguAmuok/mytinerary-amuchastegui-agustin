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

export default function Detail() {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
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
                    <Card sx={{ maxWidth: 1500, color: 'white', backgroundColor: 'black', borderRadius: '2%' }}>
                        <CardActionArea>
                            <CardMedia sx={{ height: 300, Width: 1500 }}
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
                {itineraries.length > 0 ?
                    itineraries.map((itineraries, index) =>
                        <Itinerary
                            key={index}
                            title={itineraries.title}
                            userName={itineraries.userName}
                            userPic={itineraries.userPic}
                            description={itineraries.description}
                            price={itineraries.price}
                            duration={itineraries.duration}
                            hashtag={itineraries.hashtag}
                            likes={itineraries.likes} />) : <NoItinerary />}
            </Box>
        </>
    );
}


