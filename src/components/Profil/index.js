import './style.css'
import jwt_decode from 'jwt-decode'

import { useState, useEffect } from 'react'
import userEvent from '@testing-library/user-event'

export default function Profil() {
    const token = localStorage.getItem("token")
    const dataToken = jwt_decode(token)
    const [nickname,setNickname]= useState(false)
    const [email,setEmail] = useState(false)
    const [newNickname,setNewNickname] = useState()
    const [newEmail,setNewEmail] = useState()
    
    const handleNickname = (event)=> {
        event.preventDefault()
        setNickname(!nickname)
        document.querySelector(".profil--subtitle").style.display="none";
        document.querySelector(".form-nickname").style.display="block";

    const [data, setData] = useState("")



    const change = (event) => {
        const value = event.target.value;
        console.log(value);
        setData(value)
    }


    }

    const handleEmail = (event)=> {
        event.preventDefault()
        setEmail(!email)
        document.querySelector(".profil--subtitle--email").style.display="none";
        document.querySelector(".form-email").style.display="block";

    }

    const submitNickname = (event) => {
        event.preventDefault();
        console.log(newNickname)

    }

    const submitEmail = (event) => {
        event.preventDefault();
        console.log(newEmail)

    }

    return (
        <div id="profil">
        <div className="box--profil">
            <p className="profil--subtitle">{dataToken.nickname} </p>
            <button className="profil--button" onClick={handleNickname}> Modifier le surnom </button>
            
            <form action="" className="form-nickname" onSubmit={submitNickname}>
                <input type="text" className="input-edit" onChange={(event) =>setNewNickname(event.target.value) }/>
                <button>Valider Votre nouveau pseudo</button>
            </form>
            <p >{dataToken.lastname}</p>
            <p>{dataToken.firstname}</p>
            <p className="profil--subtitle--email">{dataToken.email}</p>
            <form action="" className="form-email" onSubmit={submitEmail}>
                <input type="email" className="input-edit" onChange={(event) => setNewEmail(event.target.value) }/>
                <button>Valider votre nouvel email</button>
            </form>
            <button className="profil--button" onClick={handleEmail}> Modifier l'email </button>
            <p>{dataToken.gender}</p>
            <input type="file" name="file_path" value={data} onChange={change}     />
            <img src={data} alt="" width="250" height="250" />
        </div>
        </div>
    )
}

