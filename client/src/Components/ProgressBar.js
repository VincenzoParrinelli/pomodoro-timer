import React, { useState, useEffect, useCallback, useRef } from 'react'
import "./ProgressBar.scss"

export default function Progressbar(props) {

    const {
        pomodoroBtn,
        shortBtn,
        longBtn,
        stringtoInt,
        stringtoInt2,
        stringtoInt3,
        buttonState

    } = props

    const [maxValue, setMaxValue] = useState(0)
    const [progressValue, setProgressValue] = useState(0)
    const userTimer = localStorage.getItem("userTimer")
    const userTimer2 = localStorage.getItem("userTimer2")
    const userTimer3 = localStorage.getItem("userTimer3")


    useEffect(() => {
        if (pomodoroBtn) {
            if (userTimer) {
                setMaxValue(userTimer * 60)
            } else {
                setMaxValue(1500)
            }

        }

        if (shortBtn) {
            if (userTimer2) {
                setMaxValue(userTimer2 * 60)
            } else {
                setMaxValue(300)
            }
        }

        if (longBtn) {
            if (userTimer3) {
                setMaxValue(userTimer3 * 60)
            } else {
                setMaxValue(900)
            }
        }
       
      
    }, [])

    const setValue = useCallback(() => {
        if (pomodoroBtn) {
            if (userTimer) {
                setMaxValue(userTimer * 60)
            } else {
                setMaxValue(1500)
            }

            setProgressValue(0)

        } else if (shortBtn) {
            if (userTimer2) {
                setMaxValue(userTimer2 * 60)
            } else {
                setMaxValue(300)
            }

            setProgressValue(0)

        } else if (longBtn) {
            if (userTimer3) {
                setMaxValue(userTimer3 * 60)
            } else {
                setMaxValue(900)
            }

            setProgressValue(0)

        } else {
            setMaxValue(userTimer * 60)

            setProgressValue(0)
        }

        setProgressValue(0)
        
    }, [pomodoroBtn, shortBtn, longBtn, userTimer, userTimer2, userTimer3])

    useEffect(() => {
        if(!buttonState) return

        setProgressValue(progressValue + 1) 
    }, [stringtoInt, stringtoInt2, stringtoInt3])
    

    useEffect(() => {
        setValue(userTimer * 60)
        setProgressValue(0)
    }, [pomodoroBtn])

    useEffect(() => {
        setValue(userTimer2 * 60)
        setProgressValue(0)
    }, [shortBtn])

    useEffect(() => {
        setValue(userTimer3 * 60)
        setProgressValue(0)
    }, [longBtn])

    

    return (
        <progress
            name={pomodoroBtn ? "pomodoroBtn" :
                shortBtn ? "shortBtn" :
                    longBtn ? "longBtn" : "pomodoroBtn"}

            className="progress"
            ref={setValue}
            value={progressValue}
            max={maxValue}
        />
    )


}

