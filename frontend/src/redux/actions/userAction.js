import axios from 'axios'
// import apiUrl from '../../url'


const userActions = {

    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signUp', {...userData})
                console.log(res)
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
        //console.log(userLogin)
        return async (dispatch, getState) => {
            const res = await axios.post('http://localhost:4000/api/auth/signIn', {...userLogin})
            console.log(res)
            
            if(res.data.success) {
                localStorage.setItem('token',res.data.response.token)//guardamos el token
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
                dispatch({
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
        //console.log(data)
        return async (dispatch, getState) => {
            await axios.post('http://localhost:4000/api/auth/signOut',{...userData})
            //console.log(res)
            localStorage.removeItem('token')//removemos token
        }   
    },

    verifyToken: (token) => {
        // console.log(token)
        return async (dispatch, getState) => {          
        await axios.get('http://localhost:4000/api/auth/signInToken', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
            
        })
            .then(user => {
                if (user.data.success) {
                    dispatch({ type: 'user', payload: user.data.response });
                    dispatch({type:'userList'})
                    dispatch({
                        type: 'message',
                        payload: {
                            view: true,
                            message: user.data.message,
                            success: user.data.success
                        }
                    });
                } else {
                    localStorage.removeItem('token')
                }
            }
            ).catch(error => {
                if (error.response.status === 401)
                    dispatch({
                        type: 'message',
                        payload: {
                            view: true,
                            message: "Please signIn again",
                            success: false
                        }
                    })
                localStorage.removeItem('token')
            })
            
    }
    
}
};

export default userActions



// signIn: (logedData) => { 
        
//     return async(dispatch, getState) => {
//         try {
//             const res = await axios.post(urlApi + 'api/auth/signIn', {logedData})
//             // console.log(res)
//             if (res.data.success) {
//                 dispatch({type: 'USER', payload: res.data.response})
//             } else {
//                 dispatch({type: 'MESSAGE',
//                     payload: {
//                         view: true,
//                         message: res.data.message,
//                         success: res.data.success
//                     }
//                 })
//             }
//             return res
//         } catch(error) {
//             console.log(error)
//         }
//     }
// }