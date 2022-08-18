import axios from 'axios';

const commentsActions = {

    addComment: (comment, itineraryId) => {

        const token = localStorage.getItem('token')//busco token
        return async (dispatch, getState) =>{
            if (comment.comment !== "") { // para que no comente vacio
                const res = await axios.post('https://mi-tinerary-agustin-amu-back.herokuapp.com/api/itineraries/comment', {comment, itineraryId},{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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
            }
            else {
                dispatch({
                type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: 'Enter comment to save',
                        success: false
    
                    }
                })
            }
        }
    },

    modifyComment: (commentsMsj) => {
        const {commentId, comment} = commentsMsj
        const token = localStorage.getItem('token')
        // console.log(comment)
        return async (dispatch, getState) =>{
            const res = await axios.put(`https://mi-tinerary-agustin-amu-back.herokuapp.com/api/itineraries/comment/${commentId}`, {comment},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res // No lo trabajo desde redux, en esta instancia no los necestio tener en el ambiente glolbal, porque las acciones se desprenden desde el mismo componente que las va a realizar

        }
    },

    deleteComment: (id, commentId) => {

        const token = localStorage.getItem('token')//extraemos el token
        //console.log(token)
        return async (dispatch, getState) => {
            const res = await axios.post(`https://mi-tinerary-agustin-amu-back.herokuapp.com/api/itineraries/comment/${id}`,{}, {
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