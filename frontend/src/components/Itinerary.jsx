import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Activities from '../components/Activities'
import '../styles/styles.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ExpandMore = styled((props) => { 
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function ItineraryCard(props) {
// console.log(props)
const [reload, setReload] = useState(false)
const [likes, setLikes] = useState(props.likes)

const user = useSelector(store => store.userReducer.user)

const dispatch = useDispatch()

useEffect(() => {
    dispatch(itinerariesActions.getOneItinerary(props.id))
        .then(response => setLikes(response.likes))
        //eslint-disable-next-line
},[!reload])

console.log(props)

const like = async (event) => {
    event.preventDefault();
    await dispatch(itinerariesActions.likeDislike(props.id))
    setReload(!reload)
}

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        
            <Box>
                
                <Card className='card_tinerary' sx={{
                    display: 'flex',                        
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(192, 75, 128)',
                    opacity:'90%',
                    color: 'white',
                    padding: '10px',
                    marginTop: '2rem',                    
                    borderRadius: '5%',
                    width:'70vw'                    
                }}>

                    <Box>
                        <Typography variant='h5'sx={{marginBottom:'1rem'}}>{props.userName}</Typography>
                        <CardMedia
                            component="img"
                            src={props.userPic}
                            sx={{ borderRadius: '50%', width: '10rem', height:'10rem', marginBottom:'1rem'}} />
                    </Box>
                    <Box >
                        <Typography variant='h5'  sx={{flexGrow:1}}>{props.title} </Typography>
                        <Typography sx={{}} >{props.description}</Typography>
                        <Typography>Price:{props.price} | Duration:{props.duration}</Typography>
                        <Typography sx={{ fontStyle: 'italic' }}>{props.hashtag}</Typography>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                                
                    {user ?
                        <IconButton onClick={like}>
                            {likes.includes(user.id) ?
                        <FavoriteIcon  sx={{ color: 'red' }} /> :                     
                        <FavoriteBorderIcon/> }
                        <Typography> {likes.length} </Typography>
                        </IconButton> 
                        :
                        <IconButton>        
                        <FavoriteBorderIcon/> 
                        <Typography> {likes.length} </Typography>
                        <FavoriteIcon style={{ color: 'red' }} />
                        </IconButton>
                    }     
                            
                            <ExpandMore
                                style={{ color: 'white' }}
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>

                        <Collapse in={expanded} timeout="auto" unmountOnExit >
                            <CardContent>
                                <Typography variant='h4' paragraph >Activities</Typography>
                            </CardContent >

                    <CardContent className='card_con'>

                        {props.activitiesId.length > 0 ?
                        
                        <Activities activitiesId={props.activitiesId} />                         
                        : 
                        <Box>
                            <Typography variant='h1'>No hay nada wachin</Typography>
                        </Box>}                                                                        
                    </CardContent>                             
                        </Collapse>
                    </Box>
                </Card>
            </Box> 
                        
    );
}

// const { id } = useParams() // devuelve un objeto clave, en este caso por ID
    // const dispatch = useDispatch()

    // useEffect(() => { //se ejecuta cuando el componente se renderiza por 1ra vez o cuando se actualiza
    //     dispatch(activitiesActions.getActivitiesByitinerary(id))
    //     //eslint-disable-next-line
    // }, []);

    // const activitiesId = useSelector(store => store.activitiesReducer.getActivitiesByitinerary)


//BOTON

    // {user ?
    //     <IconButton onClick={Like}>
    //         {likes.includes(user._id) ?
    //         <FavoriteIcon style={{ color: 'gray' }} /> :
    //         <FavoriteIcon style={{ color: 'red' }} />}
    //         <Typography> {likes.length}</Typography>
    //         <FavoriteIcon style={{ color: 'red' }} />
    //     </IconButton> :
    //     <FavoriteIcon style={{ color: 'white' }} />
    // }