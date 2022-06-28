import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './components/Scrolltotop'
import {Provider} from 'react-redux';
import {configureStore as createStore} from '@reduxjs/toolkit'
import mainReducer from './redux/reducers/mainReducer'

const reduxStore = createStore({reducer:mainReducer})// creamos la STORE ..las propiedades dentro del objeto se separa con :
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //el Provider es un componente de Redux .. hace que Redux store esté disponible para cualquier componente anidado dentro

  <Provider store={reduxStore}>  
  <BrowserRouter>
  <ScrollToTop />
    <App /> 
  </BrowserRouter>
  </Provider>
);

