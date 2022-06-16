import React from 'react'
import {Link as LinkRouter} from "react-router-dom"

export default function Button() {

    return (
        
        <LinkRouter to='/Cities'  className="button-24" role="button">Return to Cities</LinkRouter>
        )        
}

