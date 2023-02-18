import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {setUsername } from '../Redux/user'
import { useNavigate } from 'react-router-dom'

function User(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)
    const username = useSelector(state => state.user.username)
    let token = useSelector(state => state.user.token)

    useEffect(() => {
        if(token === null){
            navigate('/sign-in')
        }
    }, [token, navigate])

    function undo(){
        hide("edit")
    }
    async function saveChangestoUserName(){
        const inputUsername = document.getElementById("username").value
        await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": inputUsername,
            })
        })
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .catch(function (error) {
                console.log("ERROR:" + error + error.status)
            })
            dispatch(setUsername({username: inputUsername}))
        hide("edit")
    }
    function hide(name){
        const WelcomeContainer = document.getElementById("headerWelcome")
        const editContainer = document.getElementById("headerEdit")
        if(name === "edit"){
            editContainer.style.display="none"
            WelcomeContainer.style.display="inline"

        }else{
            editContainer.style.display="flex"
            WelcomeContainer.style.display="none"
        }
    }

    return(
        <main className="main bg-dark userLayout">
            <div className="header">
                <div className="header-welcome" id="headerWelcome">
                    <h1>Welcome back<br />{firstName} {lastName} !</h1>
                    <button className="edit-button" onClick={() => hide("welcome")} >Edit Name</button>
                </div>
                <div className="header-edit" id="headerEdit">
                    <h1>Edit user info</h1>
                    <label htmlFor="username"> Username
                    <input type="text" id="username" defaultValue={username}/>
                    </label>
                    <label htmlFor="firstName"> First name
                    <input type="text" id="firstName" value={firstName} readOnly/>
                    </label>
                    <label htmlFor="lastName" > Last name
                    <input type="text" id="lastName" value={lastName} readOnly/>
                    </label>
                    <div className="header-edit-buttons">
                        <button onClick={ () => saveChangestoUserName()}>Save</button>
                        <button onClick={ () => undo()}>Cancel</button>
                    </div>
                </div>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
    </main>
    )
}

export default User;