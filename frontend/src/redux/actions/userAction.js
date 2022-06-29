import axios from 'axios'
// import apiUrl from '../../url'

let urlApi = 'http://localhost:4000/'
const userActions = {

    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post(urlApi + 'api/auth/signUp', {userData})
                // console.log(res)
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

    signIn: (logedData) => { 
        
        return async(dispatch, getState) => {
            try {
                const res = await axios.post(urlApi + 'api/auth/signIn', {logedData})
                // console.log(res)
                if (res.data.success) {
                    dispatch({type: 'USER', payload: res.data.response})
                } else {
                    dispatch({type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: res.data.message,
                            success: res.data.success
                        }
                    })
                }
                return res
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default userActions