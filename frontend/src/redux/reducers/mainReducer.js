import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer';
import userReducer from './userReducer';

const mainReducer = combineReducers({ //combinamos todos nuestros reducer en uno solo para ser luego enviado al index (?)
    citiesReducer,  
    itinerariesReducer,
    userReducer //le pasamos como objeto los distintos reducer
})

export default mainReducer 
//mainReducer permite centralizar todos nuestros reducer en un solo sitio, para mantener nuestro código ordenado
//combinamos todos nuestros reducer en uno solo para ser luego enviado al index (?)