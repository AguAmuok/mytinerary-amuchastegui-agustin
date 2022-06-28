
const initialState = { //asignamos el valor inicial
    itineraries: [],
    auxiliar: [],
    getItineraryByCity: [], 
    
}
//Los reducers especifican cómo cambia el estado de la aplicación en respuesta a las acciones enviadas al store.

const itinerariesReducer = (state = initialState, action) => { // se necesitan dos parametros en la funcion "state" y "action" para realizar un cambio

    switch(action.type){  // el type se mete en el objeto action..condicion en cada case
        case "GET_ITINERARIES": //action se mete en GET_TINERARIES   
            return{
                ...state, //state almacena valores mediante payload
                itineraries: action.payload,
                auxiliar: action.payload,
                filter: action.payload //cargamos todas las ciudades en filter valor de carga
            }
            case "GET_ONE_ ITINERARY":    
            return{
                ...state,
                oneCity: action.payload,
                auxiliar: action.payload
            }
            case "GET_ITINERARY_BYCITY":
                return {
                    ...state,
                    getItineraryByCity: action.payload
                }

            default:
                return state
    }
}

export default itinerariesReducer