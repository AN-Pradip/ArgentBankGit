import logo from "../assets/argentBankLogo.png"
import { Link, useNavigate } from "react-router-dom";
import {logOut } from '../Redux/user'
import { useDispatch, useSelector } from "react-redux";


function Header(){

    const checkLogged = useSelector(state => state.user.logged)
    const username = useSelector(state => state.user.username)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    return(
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {checkLogged
                ? 
                <div className="main-nav-user">
                    <div onClick={() => navigate("/user")} className="main-nav-user-profile">
                        <i className='fa fa-user-circle'> </i>
                        {username}
                    </div>  
                    <Link className='main-nav-item' to='/' onClick={ () => dispatch(logOut())}> 
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out 
                    </Link> 
                </div>
                : 
                <Link className='main-nav-item' to='/sign-in'> 
                    <i className='fa fa-user-circle'></i> Sign In 
                </Link>}
            </div>
        </nav>
    )
}

export default Header;