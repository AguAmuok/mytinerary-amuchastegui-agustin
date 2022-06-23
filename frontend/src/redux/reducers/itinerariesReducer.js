const initialState = {
    itineraries: [],
    auxiliar: [],
    getItineraryByCity: [],
    
}

const itinerariesReducer = (state = initialState, action) => { //action es una funcion y reduce tambien pero funciona con dos propiedades

    switch(action.type){  // el type se mete en el objeto action..condicion en cada case
        case "GET_ITINERARIES": //action se mete en GET_CITIES   
            return{
                ...state,
                itineraries: action.payload,
                auxiliar: action.payload,
                filter: action.payload //cargamos todas las ciudades en filter
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