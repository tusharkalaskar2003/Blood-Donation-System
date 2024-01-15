import React, {useState} from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from "./Context/AuthContext.js";
import {useNavigate} from 'react-router-dom'

function Navbar(props) {
   let check = props.fun;
   const navigate = useNavigate();

   // const [isLogin, setIsLogin] = useState(false);
   const [login_title, setLogin_title] = useState("Login");
   const { isAuthenticated, login, logout } = useAuth();
   // const navigate = useNavigate();

   const goLoginForm = (e)=>{
      check.setShowLogin(!check.showLogin);
   }

   const goHome = ()=>{
      if(check.showLogin){
         check.setShowLogin(!check.showLogin);
      }
   }

   const logOutHandle = ()=>{
      logout();
   }


   return (
      <>
      <header className="Navbar flex ali-cent just-cent abs">
         <div className="list flex ali-cent just-cent">
            <ul className="flex">
               <li onClick={ goHome }><NavLink to="#" href="#home">Home</NavLink></li>
               <li onClick={ goHome }><NavLink to="#">About</NavLink></li>
               <li>
                  
                  {isAuthenticated ?
                     (<NavLink to="/" onClick={logOutHandle}>Logout</NavLink>)
                     : 
                     (<NavLink to="#" onClick={goLoginForm}>Login</NavLink>)
                  }
                  
               </li>
               {/* {addNavList && <li>Vilas</li>} */}
            </ul>
         </div>
      </header>
      <Outlet/>
      </>
   )
}

export default Navbar
