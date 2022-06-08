import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
import Index from './pages/Index'
import Underconstruction from './pages/Underconstruction'



function App() {
    return (
        <>
            <NavBar />
                
            <Routes>
                <Route path='/' element={ <Index />} />
                <Route path='/Underconstruction' element={ <Underconstruction />}/>

            </Routes>
            
            <Footer />

        </>
    );
}

export default App;
