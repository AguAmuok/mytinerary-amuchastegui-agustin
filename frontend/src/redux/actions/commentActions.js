import axios from 'axios';

const commentsActions = {

    addComment: (comment, itineraryId) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) =>{
            if (comment.comment !== "") { // para que no comente vacio
                const res = await axios.post('http://localhost:4000/api/itineraries/comment', {comment, itineraryId},{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(res)
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }
            else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: 'Enter comment to save',
                        success: false
    
                    }
                })
            }
        }
    },

    modifyComment: (commentId,comment) => {       
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try{
                const res = await axios.put('http://localhost:4000/api/allItineraries/comment/' +  commentId,  { ...comment }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                //console.log(res)
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })  
                return res
            }catch(err){
                console.log(err)
            }           
        }
    } ,

    deleteComment: (id, commentId) => {

        const token = localStorage.getItem('token')//extraemos el token
        //console.log(token)
        return async (dispatch, getState) => {
            const res = await axios.delete(`http://localhost:4000/api/itineraries/comment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data:{commentId}
            })            
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }              
            })
            return res
        }
    },

}

export default commentsActions;