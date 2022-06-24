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
    
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        
            <Box sx={{ display: 'flex '}}>
                
                <Card className='card_tinerary' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1',                         
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(192, 75, 128)',
                    opacity:'90%',
                    color: 'white',
                    padding: '10px',
                    marginTop: '2rem',                    
                    borderRadius: '5%'                    
                }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                        <Typography variant='h5'sx={{marginBottom:'1rem'}}>{props.userName}</Typography>
                        <CardMedia
                            component="img"
                            src={props.userPic}
                            sx={{ borderRadius: '50%', width: '10rem', height:'10rem', marginBottom:'1rem'}} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <Typography variant='h5'  sx={{flexGrow:1}}>{props.title} </Typography>
                        <Typography sx={{}} >{props.description}</Typography>
                        <Typography>Price:{props.price} | Duration:{props?.duration}</Typography>
                        <Typography sx={{ fontStyle: 'italic' }}>{props.hashtag}</Typography>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon style={{ color: 'red' }} />
                                    
                            </IconButton>
                            {props.likes}
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
                                <Typography paragraph >Soon we will have more itineraries!</Typography>
                            </CardContent>
                        </Collapse>
                    </Box>
                </Card>
            </Box>             
    );
}