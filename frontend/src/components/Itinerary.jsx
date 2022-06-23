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
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import itinerariesActions from '../redux/actions/itinerariesActions';



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

export default function ItineraryCard() {
    const {id} = useParams() //recibimos el id, y con el metodo useParams destructuramos el parametro 
    const dispatch = useDispatch()
    useEffect( () =>  { 
        dispatch(itinerariesActions.getItinerariesByCity(id))
        // eslint-disable-next-line
    },[id])

    const itineraries = useSelector(store => store.itinerariesReducer.getItineraryByCity)
    console.log(itineraries)


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    
    return (
        <>{itineraries &&  
        <>
            {itineraries.map((itineraries) => { 
                return(
            <Box key={itineraries._id} sx={{display:'flex ', width:'50%', flexDirection:'row'}}>
            
            <Card  sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            height: '40%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(32, 35, 37)',           
            color: 'white',
            padding: '10px',
            marginTop: '2rem',
            width: '50%'}}>
                
                <Box sx={{display:'flex', flexDirection:'column' , height:'15rem', width:'10rem',  margin: '2rem' }}>
                    <Typography>{itineraries.userName}</Typography>
                    <CardMedia 
                    component="img"                
                    src= {itineraries.userPic}
                    sx={{borderRadius:'50%', maxWidth:'15rem'}} />                             
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', margin:'3rem'}}>
            <Typography variant='h2'>{itineraries.title} </Typography>
            <Typography variant='subtitle1'>{itineraries.description} </Typography>
            <Typography variant='subtitle2'>{itineraries.price} | {itineraries?.duration}</Typography>
            <Typography variant='subtitle2'>{itineraries.hashtag}</Typography>
            <CardActions sx={{display:'flex', justifyContent:'center'}}>
            <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{color:'red'}} />
                </IconButton>   
                <ExpandMore
                    style={{color:'white'}}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Soon we will have more itineraries!</Typography>                  
                </CardContent>
            </Collapse>         
            </Box>
            
        </Card>
        </Box>)})}
        </> }   
        </>            
    );
}