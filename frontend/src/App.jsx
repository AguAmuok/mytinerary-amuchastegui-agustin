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
import Snackbar from './components/Snackbar'
import userActions from './redux/actions/userAction'
import {connect} from 'react-redux'





function App(props) {
    //llamamos a todas las cities en todas las paginas.. 
    const dispatch = useDispatch()

    useEffect(() => { //se ejecuta cuando el componente se renderiza por 1ra vez o cuando se actualiza
        dispatch(citiesActions.getCities())  
        if(localStorage.getItem('token') !== null) { //buscamos si token existe en el local storaje
            const token = localStorage.getItem("token")//cada vez que se actualiza el useEffec  busca el token
            dispatch(userActions.verifyToken(token))
        }      
        //eslint-disable-next-line
},[])



    return (
        <>
            <NavBar />
            <Routes>
                <Route path="*" element={<Index />} />
                <Route path='/' element={ <Index />} />
                {!props.user && <Route path='/SignUp' element={ <SignUp />}/>}
                {!props.user && <Route path='/SignIn' element={ <SignIn />}/>}
                <Route path='/Cities' element={ <Cities />} />
                <Route path='/City/:id' element={ <Detail />} />
                {/* <Route path='/City/:id' element={ <Itinerary />} /> */}
            </Routes>      
            <Snackbar/>      
            <Footer />
            <ScrollToTop
                style={{backgroundColor: 'white', opacity:'70%', width:'50px', height:'50px'}}                
                smooth
                viewBox="0 0 24 24"
                component={<FileUploadIcon />} />   
        </>
    );
}

const mapDispatchToProps = {
    verifyToken: userActions.verifyToken,                  
}

    const mapStateToProps = (state) => {
    return {
    user: state.userReducer.user,
    
    }
}

    export default connect(mapStateToProps, mapDispatchToProps)(App);

