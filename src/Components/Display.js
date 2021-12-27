import React from 'react'
import './Display.scss'

export default function Display(props) {
    const {
        timer,
        timer2,
        timer3,
        pomodoroBtn,
        shortBtn,
        longBtn,
        
    } = props

    return (
        <div className="Display">
            {pomodoroBtn ? timer : 
            shortBtn ? timer2 :
            longBtn ? timer3 : timer}
        </div>
    )
}
