/* eslint-disable react-hooks/rules-of-hooks */
import './style.css'
import Logo from '../../img/Logo.png'
import Connexion from '../Connexion'
import {
  Icon,
} from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'

import { NavLink } from 'react-router-dom'
import SlideBar from './slidebar'


export default function header() {
  const token = localStorage.getItem("token");
  
  /*hamburger.addEventListener("click", () => {
      document.querySelector(".hiddenNav").style.display="block";
  })*/

  const handleHamburger = (event) => {
    console.log(document.querySelector("#icon-hamburger"))
    //console.log(document.querySelector("#slidebar"))
    document.querySelector("#slidebar").style.width = "300px"
    document.querySelector("#slidebar").style.padding = "1rem"
  }

  const handleNav = () => {
    document.querySelector("#slidebar").style.width="0px";
    document.querySelector("#slidebar").style.padding="0rem"
  }


  const loginNav = () => {
    
    if (token) {

      return (
        <nav className="navBar">
          <div className="toggle hiddenNav">
            <NavLink onClick={handleNav} to="/recherche"><Icon name='search' /></NavLink>
            <NavLink onClick={handleNav} to="/profil"><Icon name='user circle' /></NavLink>
            <NavLink onClick={handleNav} to="/logout"><Icon color="red" name='log out' /></NavLink>
          </div>

        </nav>

      const dataToken = jwt_decode(token);
      if(dataToken.role === "user") {
        return (
          <nav className="navBar">
              <NavLink to="/submitactivity">Soumettre une activité</NavLink>
              <NavLink to="/recherche">Rechercher une activité</NavLink>
              <NavLink to="/profil">Profil</NavLink>
              <NavLink to="/logout">Déconnexion</NavLink>
          </nav>
  
        )
      } else if(dataToken.role === "admin") {
        return (
          <nav className="navBar">
              <NavLink to="/admin">Administrer</NavLink>
              <NavLink to="/submitactivity">Soumettre une activité</NavLink>
              <NavLink to="/recherche">Rechercher une activité</NavLink>
              <NavLink to="/profil">Profil</NavLink>
              <NavLink to="/logout">Déconnexion</NavLink>
          </nav>
        )
      }


      
    } else {

      return (
        <nav className="navBar">
          <NavLink onClick={handleNav} to="/recherche"><Icon name='search' /></NavLink>
          <NavLink onClick={handleNav} to="/signup">Inscription</NavLink>
          <Connexion />
        </nav>
      )

        return (
          <nav className="navBar">
            <NavLink to="/recherche">Rechercher une activité</NavLink>
            <NavLink to="/signup">Inscription</NavLink>
            <Connexion />
          </nav>
        )

    }
  }

  return (
    <header className="header">
      <SlideBar />
      <div className="header-column">
        <div className="box--img">
          <NavLink to="/"><img className="img--header" src={Logo} alt="logo du site" width="300" /></NavLink>
        </div>
        <div className="header--navbar">
        <NavLink to="/"><h1>Kid'Oz'Anges</h1></NavLink>
        {loginNav()}
        </div>
        <div className="box--hamburger">
          <Icon onClick={handleHamburger} id="icon-hamburger" className="icon-hamburger" name='bars' size="big" color="blue" />
        </div>
      </div>
    </header>
  )
}