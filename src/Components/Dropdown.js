import React, { useState, useEffect, useRef, useContext } from 'react'
import Ellipsis from "../Icons/ellipsis.png"
import bin from "../Icons/bin.png"
import "./Dropdown.scss"
import { mainContext } from '../App'

export default function Dropdown(props) {

    const {
        list,
        setList,
        setEstTotal,
        setActTotal
    } = props

    const [dropdown, setDropdown] = useState(false)
    const { pomodoroBtn, shortBtn, longBtn } = useContext(mainContext)

    const body = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            if (body.current && !body.current.contains(e.target)) {
                setDropdown(false)
            }
        })

        return () => {
            document.addEventListener("mousedown", (e) => {
                if (body.current && !body.current.contains(e.target)) {
                    setDropdown(false)
                }
            })
        }
    }, [body])

    const handleClearFinished = () => {
        let newArray = list.filter(item => typeof item !== "object")
        setList([...newArray])
        setDropdown(false)
    }

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete all tasks?")) {
            setList([])
            setEstTotal(0)
            setActTotal(0)
            setDropdown(false)
        }
    }

    return (
        <div ref={body}>

            <img src={Ellipsis}
                name={pomodoroBtn ? "pomodoroBtn" :
                    shortBtn ? "shortBtn" :
                        longBtn ? "longBtn" : "pomodoroBtn"}
                onClick={!dropdown ? () => setDropdown(true) : () => setDropdown(false)}
                className="ellipsis"
            />

            {dropdown && (
                <div className="dropdown">
                    <div className="functions-container">
                        <div className="functions" onClick={() => handleClearFinished()}>
                            <img src={bin} /> Clear finished Tasks
                        </div>
                    </div>

                    <div className="functions-container" style={{top: "-22px"}}>
                        <div className="functions" onClick={() => handleClearAll()}>
                            <img src={bin} /> Clear all Tasks
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
