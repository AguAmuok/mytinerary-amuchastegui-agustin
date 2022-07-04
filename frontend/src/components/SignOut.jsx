import React from 'react'
import Typography from '@mui/material/Typography'
import {Link as LinkRouter} from "react-router-dom"
import MenuItem from '@mui/material/MenuItem'
import {connect} from 'react-redux';
import userActions from '../redux/actions/userAction'

function SignOut(props) {
    function signOut() {
        localStorage.setItem("user", JSON.stringify({}));//borro el la info de users
		props.signOut(props.user.email)
	}
    return ( //retorno el HTML
        <MenuItem onClick={props.handleCloseUserMenu}>
            <LinkRouter to={'/'}>
                <Typography onClick={signOut} className='fredokaFont' sx={{color: 'white'}}>Sign Out</Typography>
            </LinkRouter>
        </MenuItem>       
    )
}

const mapDispatchToProps = {
	signOut: userActions.signOut,
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)