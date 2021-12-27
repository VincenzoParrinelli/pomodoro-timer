import React from 'react'
import "./Button.scss"

export default function Button(props) {
    
    const {
        pomodoroBtn,
        shortBtn,
        longBtn,
        buttonState,
        handleButton
    } = props

    return (
        <button 
        name={!buttonState ? "START" : "STOP"} 
        className={pomodoroBtn ? "btn red" :
        shortBtn ? "btn lblue" :
        longBtn ? "btn blue" : "btn red"} 
        onClick={handleButton}>{!buttonState ? "START" : "STOP"}</button>
    )
}
