import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
import Index from './pages/Index'
// import Underconstruction from './pages/Underconstruction'
import Cities from './pages/Cities'
import Detail from './components/Detail'
import ScrollToTop from "react-scroll-to-top"
import FileUploadIcon from '@mui/icons-material/FileUpload'
import citiesActions from './redux/actions/citiesActions'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'


function App() {
    //llamamos a todas las cities en todas las paginas.. 
    const dispatch = useDispatch()

    useEffect(() => { //se ejecuta cuando el componente se renderiza por 1ra vez o cuando se actualiza
        dispatch(citiesActions.getCities())        
        //eslint-disable-next-line
},[])

    return (
        <>
            <NavBar />

            <Routes>
                <Route path='/' element={ <Index />} />
                <Route path='/SignUp' element={ <SignUp />}/>
                <Route path='/SignIn' element={ <SignIn />}/>
                <Route path='/Cities' element={ <Cities />} />
                <Route path='/City/:id' element={ <Detail />} />
                {/* <Route path='/City/:id' element={ <Itinerary />} /> */}

            </Routes>            
            <Footer />
            <ScrollToTop
                style={{backgroundColor: 'white', opacity:'70%', width:'50px', height:'50px'}}                
                smooth
                viewBox="0 0 24 24"
                component={<FileUploadIcon />} />   
        </>
    );
}

export default App;

