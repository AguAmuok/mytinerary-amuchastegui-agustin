const initialState = {
    cities: [],
    auxiliar: [],
    oneCity: {},
    filter:[]
}
//Los reducers especifican cómo cambia el estado de la aplicación en respuesta a las acciones enviadas al store.
const citiesReducer = (state = initialState, action) => { //action es una funcion y reduce tambien pero funciona con dos propiedades

    switch(action.type){  // el type se mete en el objeto action..condicion en cada case
        case "GET_CITIES": //action se mete en GET_CITIES   
            return{
                ...state, // el state es solo de lectura
                cities: action.payload,
                auxiliar: action.payload,
                filter: action.payload //cargamos todas las ciudades en filter
                                //payLoad = valor de carga
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

