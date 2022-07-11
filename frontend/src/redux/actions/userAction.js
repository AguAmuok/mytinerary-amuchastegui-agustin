import axios from 'axios'



const userActions = {

    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post('https://mi-tinerary-agustin-amu-back.herokuapp.com/api/auth/signUp', {...userData})
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            } catch(error) {
                console.log(error)
            }
        }
    },


    signIn: (userLogin) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://mi-tinerary-agustin-amu-back.herokuapp.com/api/auth/signIn', {...userLogin})//pedido post a la base de datos
            
            if(res.data.success) {
                localStorage.setItem('token',res.data.response.token)// se activa si los datos funcionan y guardamos el token
                dispatch({
                    type: 'USER',
                    payload: res.data.response.userData
                })
                dispatch({
                    type: 'MESSAGE',
                    payload:{
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            } else {
                dispatch({//te avisa que nos loguiemos o que esta mal un dato
                    type: 'MESSAGE',
                    payload: {
                        view: true, 
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
        } 
    },

    signOut: (userData) => {
    return async (dispatch, getState) => {
        await axios.post('https://mi-tinerary-agustin-amu-back.herokuapp.com/api/auth/signOut',{...userData})//esperamos que axios nos de        
        localStorage.removeItem('token')//removemos el token
        
        dispatch({
            type:'USER',
            payload:null
        })
    }   
},

    verifyToken: (token) => {
    return async (dispatch, getState) => {       
        const user = await axios.get('https://mi-tinerary-agustin-amu-back.herokuapp.com/api/auth/signInToken', {headers: {'Authorization': 'Bearer ' + token}} ) //por cabecera pedimos el metodo 'BEARER ' para autenticar y autorizar usuarios      
        if (user.data.success) {
            dispatch({//despacha el tipo de usuario y los datos
                type: 'USER',
                payload: user.data.response 
            })
            dispatch({// despacha un mensaje si es exitoso
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            })
        } else {
            localStorage.removeItem('token')//remuevo el token de localStorage en caso de no coincidir
        }
    }
}
}

export default userActions