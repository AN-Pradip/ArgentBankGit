import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login,logOut } from '../Redux/user'

function SignIn(){


    const dispatch = useDispatch();
    const navigate = useNavigate();
    let loggedState = useSelector(state => state.user.rememberMe)
    let rememberMe

    useEffect(() => {
        if(loggedState){
            navigate("/user")
        } else {
            dispatch(logOut())
        }
    }, [loggedState, navigate, dispatch])

    async function SignIn(e) {
        e.preventDefault()
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        rememberMe = document.getElementById("remember-me").checked;
        await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        })
            .then(response => response.json())
            .then((data) => getProfileData(data.body))
            .catch(function (error) {
                console.log("ERROR:" + error + error.status)
            })
    }

    async function getProfileData(data) {
        rememberMe = document.getElementById("remember-me").checked;
        await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + data.token,
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (userData) {
                dispatch(login({token: data.token, eMail: userData.body.email, lastName: userData.body.lastName, firstName: userData.body.firstName, rememberMe: rememberMe, logged: true, username: userData.body.userName}))
                navigate('/user')
            })
            .catch(function (error) {
                console.log("ERROR:" + error + error.status)
            })
    }



    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form id="signIn" target="_blank" onSubmit={SignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default SignIn;