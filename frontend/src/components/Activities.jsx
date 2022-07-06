import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function Activities(activitiesId){
    
const allActivities = activitiesId
    return(
        <>
        {allActivities.activitiesId.map( activity =>
        
            <Box  key={activity._id} sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
            <Typography variant='h5'>{activity.name}</Typography>
            <CardMedia
                component="img"
                src={activity.image}
                sx={{width: '10rem', height:'10rem', m:'2.5rem'}} />
            </Box>)}

        </>
    )
}

