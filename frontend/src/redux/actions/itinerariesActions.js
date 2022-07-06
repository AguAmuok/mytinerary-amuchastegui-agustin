import axios from "axios";

//Las action solo describen que es lo que se va a pedir que haga
//Las action son el único mecanismo en Redux para enviar información a tu store.

const itinerariesActions = { //action es un objeto que contiene una funcion con dos propiedades

    getItineraries: () => {
        return async (dispatch, getState) => { // el dispatch es lo que recibe como parametro el reducer junto al estado para luego trabajarlo y cambiarlo
            const res = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({type: "GET_ITINERARIES", payload:res.data.response}) // payLoad/"carga util": nos referirnos a los datos que necesita un action en Redux para funcionar correctamente
        }
    },

    getOneItinerary: (id) => {

        return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
        dispatch({type: "GET_ONE_ITINERARY", payload:res.data.response})
    }
},

    getItinerariesByCity: (id) => { //muestra itinerarios por ID
                return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/itinerarybycity/${id}`)
        
        dispatch({type: "GET_ITINERARY_BYCITY", payload:res.data.response})
    }
},

likeDislike: (id) => {
    const token = localStorage.getItem('token')// levantamos el token que necesita passport
    //console.log(token)
    return async () => {
        try {
            let response = await axios.put(`http://localhost:4000/api/like/${id}`, {},//ponemos un objeto vacio para pasarlo como primer parametro
            {headers: {
                Authorization: 'Bearer '+ token
                }
            })
            //console.log(response)
            return response
            
        }catch (error) {
            console.log(error)
        }
    }
}
}

export default itinerariesActions