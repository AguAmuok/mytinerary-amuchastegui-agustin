import axios from "axios";

const itinerariesActions = { //action es un objeto que contiene una funcion con dos propiedades

    getItineraries: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/itineraries')
            console.log(res)
            dispatch({type: "GET_ITINERARIES", payload:res.data.response})
        }
    },

    getOneItinerary: (id) => {

        return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
        dispatch({type: "GET_ONE_ ITINERARY", payload:res.data.response})
    }
},

    getItinerariesByCity: (id) => {
                return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/itinerarybycity/${id}`)
        
        dispatch({type: "GET_ITINERARY_BYCITY", payload:res.data.response})
    }
},
}

export default itinerariesActions