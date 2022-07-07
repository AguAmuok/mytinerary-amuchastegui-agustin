// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function Activities(activitiesId){
    
const allActivities = activitiesId
    return(
        <>
        {allActivities.activitiesId.map( activity =>
        <CardContent key={activity._id} sx={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
        <Card sx={{maxWidth: 300}}>
            <CardActionArea>
            
            <CardMedia sx={{ height:'15rem'}}
                className='img-activity'
                component="img"
                image={activity.image}                
            />
            <CardContent sx={{backgroundColor: 'black', opacity:'80%'}} >
                <Typography sx={{}} color="white">
                <Typography paragraph>{activity.name}</Typography>
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        </CardContent>)}
        </>
    )
}