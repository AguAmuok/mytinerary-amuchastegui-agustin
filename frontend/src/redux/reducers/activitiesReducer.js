
const initialState = { //asignamos el valor inicial
    activities: [],
    getOneActivity: {},
    getActivitiesByitinerary: [], 
    
}
//Los reducers especifican cómo cambia el estado de la aplicación en respuesta a las acciones enviadas al store.

const activitiesReducer = (state = initialState, action) => { // se necesitan dos parametros en la funcion "state" y "action" para realizar un cambio

    switch(action.type){  // el type se mete en el objeto action..condicion en cada case
        case "GET_ACTIVITIES": //action se "mete" en GET_ACTIVITIES  
            return{
                ...state, //state almacena valores mediante payload
                activities: action.payload,
                
            }
            case "GET_ONE_ ACTIVITY":    
            return{
                ...state,
                getOneActivity: action.payload,
                
            }
            case "GET_ACTIVITY_BYITINERARY":
                return {
                    ...state,
                    getActivitiesByitinerary: action.payload
                }

            default:
                return state
    }
}

export default activitiesReducer