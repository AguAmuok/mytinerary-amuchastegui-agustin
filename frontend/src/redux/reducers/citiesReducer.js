const initialState = {
    cities: [],
    auxiliar: [],
    oneCity: {},
    filter:[]
}

const citiesReducer = (state = initialState, action) => { //action es una funcion y reduce tambien pero funciona con dos propiedades

    switch(action.type){  // el type se mete en el objeto action..condicion en cada case
        case "GET_CITIES": //action se mete en GET_CITIES   
            return{
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
                filter: action.payload //cargamos todas las ciudades en filter
            }
            case "GET_ONE_ CITY":    
            return{
                ...state,
                oneCity: action.payload,
                auxiliar: action.payload
            }
            case "FILTER_CITIES":
                let cityFilter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
                return{
                    ...state,
                    filter:cityFilter
                }
            
            default:
                return state
    }
}

export default citiesReducer

