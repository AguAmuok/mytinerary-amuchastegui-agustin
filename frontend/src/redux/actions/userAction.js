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
                localStorage.setItem('token',res.data.response.token)
                dispatch({
                    type: 'USER',
                    payload: res.data.response.userData
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
    }

}

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