import React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'

function Alert(props) {
    //console.log(props)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({
            type: 'MESSAGE',
            payload: {view: false, message: '', success: false}
        })
    }
    const action = (
        <Box sx={{
            width: '100%',
            backgroundColor: props.snackbar.success ? 'rgb(122, 241, 0)':'rgb(255, 0, 71)',
            color: 'black',
            fontSize:'1rem',
            borderRadius: '4px',
            padding: '12px',
            
            fontWeight: '400'}}>
            {(typeof props.snackbar.message) === "string" ? 
                (<p>{props.snackbar.message}</p>) :
                <div>{props.snackbar.message.map((message,index) =><p key={index}>{message.message}</p>)}</div>
            }

        </Box>
    )

    return (
        <Snackbar
            spacing={1}
            open={props.snackbar.view}
            autoHideDuration={7000}
            onClose={handleClose}
            action={action}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            message={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            } 
        />
    )
}

const mapStateToProps = (state) => {
    return {
        snackbar: state.userReducer.snackbar,
    }
}

export default connect(mapStateToProps, null)(Alert)














