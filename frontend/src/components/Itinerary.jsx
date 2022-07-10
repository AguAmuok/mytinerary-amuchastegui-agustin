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
import { useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { connect } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CustomInput from '@mui/base/InputUnstyled';
import commentActions from '../redux/actions/commentActions';
import itinerariesActions from '../redux/actions/itinerariesActions';
import OutboxIcon from '@mui/icons-material/Outbox';


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


function ItineraryCard(props) {
    // console.log(props)
    const [reload, setReload] = useState(false)

    const [likes, setLikes] = useState(props.likes)

    const [modify, setModify] = useState('')

    const user = useSelector(store => store.userReducer.user)

    const [text, setText] = useState('')
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itinerariesActions.getOneItinerary(props.id))
            .then(response => setLikes(response.likes))
        //eslint-disable-next-line
    }, [!reload])

    // console.log(props)

    const like = async (event) => {
        event.preventDefault();
        await dispatch(itinerariesActions.likeDislike(props.id))
        setReload(!reload)
    }

    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const handleText = (event) => {
        setText(event.target.value)
        // console.log(text)

    }


    const handleSend = () => {
        dispatch(commentActions.addComment(text, props.id))
            .then(props.getItineraries)
            .catch(error => console.log(error))

    }

    async function handleModify(event) {
        const commentsMsj = {
            commentId: event,
            comment: modify
        }
        const res = await dispatch(commentActions.modifyComment(commentsMsj))
        setReload(!reload)
        console.log(res)
        // .then(props.getItineraries)
    }

    async function handleDelete(id) {
        await dispatch(commentActions.deleteComment(id))
            .then(props.getItineraries)
        // console.log(id)
    }


    return (
        <Box>

            <Card className='card_tinerary' sx={{ display: 'flex', flexGrow: 1, textAlign: 'center', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(192, 75, 128)', filterBlur: '10%', opacity: '80%', color: 'white', padding:'10px',
            marginTop: '2rem', borderRadius: '2%', maxWidth: '100%'
            }}>

                <Box >
                    <Typography variant='h5' sx={{ marginBottom: '1rem' }}>{props.userName}</Typography>
                    <CardMedia
                        component="img"
                        src={props.userPic}
                        sx={{ borderRadius: '50%', width: '10rem', height: '10rem', marginBottom: '1rem' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h5' sx={{ flexGrow: 1 }}>{props.title} </Typography>
                    <Typography sx={{ flexGrow: 1 }} >{props.description}</Typography>
                    <Typography>Price:{props.price} | Duration:{props.duration}</Typography>
                    <Typography sx={{ fontStyle: 'italic' }}>{props.hashtag}</Typography>
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

                        {user ?
                            <IconButton onClick={like}>
                                {likes.includes(user.id) ?
                                    <FavoriteIcon sx={{ color: 'red', fontStyle: 'large' }} /> :
                                    <FavoriteBorderIcon />}
                                <Typography sx={{ color: 'white', marginLeft: '1rem' }} > {likes.length} </Typography>
                            </IconButton>
                            :
                            <IconButton>
                                <FavoriteBorderIcon />
                                <Typography> {likes.length} </Typography>
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

                        <CardContent className='card_con'>

                            {props.activitiesId.length > 0 ?

                                <Activities activitiesId={props.activitiesId} />
                                :
                                <Box>
                                    <Typography variant='h3'>Soon we will have new activities!</Typography>
                                </Box>}

                        </CardContent>

                        {props.comments.map((item, index) => {
                            // console.log(item)
                            return (

                                <Box key={index} sx={{ flexGrow: 1, borderRadius: '.5rem', margin: '1rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgb(18, 20, 21)', color: 'white', height: '10rem' }}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                                        {props.user ?
                                            <Avatar src={item.userId.photoUser} sx={{ flexGrow: 1,marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} /> :
                                            <Avatar sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} alt="Remy Sharp" src={item.userId.photoUser} size="lg" />}
                                        <Typography sx={{ mt: '.5rem', color: 'white' }}>{item.userId.nameUser}</Typography>
                                    </Box>


                                    <Typography onInput={(event) => setModify(event.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable key={index} sx={{ color: 'white', fontSize: '1rem' }}>{item.comment}</Typography>

                                    {props.user && props.user.id === item.userId._id ?

                                        <Box sx={{ ml: '.5rem', display: 'flex', flexDirection: 'column' }}>
                                            <Button onClick={() => handleModify(item._id)} fontSize='small' sx={{ ml: '1rem' }}  color="success">
                                                <EditIcon sx={{ color: 'rgb(142, 191, 85)' }} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item._id)}  sx={{ ml: '1rem' }} color="error">
                                                <DeleteIcon />
                                            </Button>
                                        </Box> : <Box></Box>}

                                </Box>)
                        })}

                        <Box className='comment-box' sx={{margin: '1rem', borderRadius: '.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(18, 20, 21)', color: 'black', height: '10rem' }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }} >

                                {props.user ?
                                    <Avatar src={props.user.photoUser} sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem', }} /> :
                                    <AccountCircleIcon sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="lg" />}

                            </Box>

                            
                            <CustomInput  onChange={(event) => handleText(event)} sx={{ color: 'black', fontSize: '1.4rem' }}
                                multiline placeholder="Type something…" />
                            <Button className='button-add' sx={{ color: 'rgb(142, 191, 85)', fontSize: 'large', marginRight: '2rem' }} onClick={() => handleSend()} endIcon={<OutboxIcon sx={{ mb: '.5rem', width: '35px', height: '35px' }} />}>
                            </Button>
                        </Box>
                    </Collapse>
                </Box>
            </Card>
        </Box>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, null)(ItineraryCard)
    // console.log(props))