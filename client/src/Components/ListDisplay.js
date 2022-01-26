import React, { useState, useEffect, useContext } from 'react'
import "./ListDisplay.scss"
import { mainContext } from '../App'

export default function ListDisplay(props) {

    const {
        estTotal,
        actTotal
    } = props

    const [currentDate, setCurrentDate] = useState()
    const [newTime, setNewTime] = useState()
    const { stringtoInt, pomodoroBtn, shortBtn, longBtn } = useContext(mainContext)
    
    useEffect(() => {
        let timer = stringtoInt
        if (timer.length === 4) {
            var getMinutes = timer.substring(0, 2)
        } else {
            getMinutes = timer.substring(0, 1)
        }
        let date = new Date()

        if (actTotal) {
            if(!currentDate) return
            var time = new Date(currentDate.getTime() - getMinutes * estTotal * 60000)
        } else {
            time = new Date(date.getTime() + getMinutes * estTotal * 60000)
            setCurrentDate(time)
        }

        let hours = time.getHours().toString()
        let minutes = time.getMinutes().toString()

        if (hours.length < 2) {
            hours = "0" + hours
        }
        if (minutes.length < 2) {
            minutes = "0" + minutes
        }

        setNewTime(hours + ":" + minutes)


    }, [actTotal, estTotal])

    return (
        <div className="ListDisplay"
            name={pomodoroBtn ? "pomodoroBtn" :
                shortBtn ? "shortBtn" :
                    longBtn ? "longBtn" : "pomodoroBtn"}>

            <div className="text">
                Est:
            </div>

            <div className="value">
                {estTotal}
            </div>

            <div className="text">
                Act:
            </div>

            <div className="value">
                {actTotal}
            </div>

            <div className="text"> Finish at: </div>
            <div className="value">{newTime}</div>


        </div>
    )
}
