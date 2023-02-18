import React, {useEffect} from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {logOut } from '../Redux/user'



function Homepage(){
    let loggedState = useSelector(state => state.user.rememberMe)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(loggedState){
            // navigate("/user")
        } else {
            dispatch(logOut())
        }
    }, [loggedState, navigate, dispatch])


    return(
        <main> 
            <Hero />
            <Features />
        </main>
    )
}

export default Homepage;