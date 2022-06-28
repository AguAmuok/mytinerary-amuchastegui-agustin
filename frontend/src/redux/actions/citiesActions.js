import axios from "axios";

//Las action SON FUNCIONES EN FORMA DE OBJETO O METODOS
//Las action son el único mecanismo en Redux para enviar información a tu store.

const citiesActions = { //action es un objeto que contiene una funcion con dos propiedades

    getCities: () => {
        return async (dispatch, getState) => {  //redux aun no es compatible con funciones asyncronas
            
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: "GET_CITIES", payload:res.data.response.cities})
        }
    },

    getOneCity: (id) => {

        return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/cities/${id}`)
        dispatch({type: "GET_ONE_ CITY", payload:res.data.response.city})
    }
},

    filterCities: (input) => {
        return async (dispatch, getState) => {
            dispatch ({type: "FILTER_CITIES" , payload: input})
    }
}
}

export default citiesActions