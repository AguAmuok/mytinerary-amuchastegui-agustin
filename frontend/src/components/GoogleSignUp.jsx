import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userAction'


export default function GoogleSignUp() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        dispatch(userActions.signUp({           
            nameUser: userObject.given_name,
            lastNameUser: userObject.family_name, 
            photoUser: userObject.picture, 
            email: userObject.email,
            country: userObject.country, 
            password: userObject.sub, 
            from: 'google'          
        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '585920736082-fk91ago91nilf2f8bgeuib7dvufiuao1.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large', locale: 'en'}
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}