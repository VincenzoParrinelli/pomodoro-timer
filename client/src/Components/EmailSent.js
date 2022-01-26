import React from 'react'
import "./EmailSent.scss"
import whiteTomato from "../Icons/white-tomato.png"

export default function EmailSent() {
    return (
        <div className='EmailSent'>
            <img className="tomato" src={whiteTomato}/>

            <h2>Activation link have been sent</h2>

            <p>Activation link have been sent to your email address.
            To start using Pomofocus, please activate your account from the link.</p>
        </div>
    )
}
