import React from 'react'
import "./Nav.scss"

export default function Nav(props) {

    const {
        pomodoroBtn,
        shortBtn,
        longBtn,
        handleNavBtns
    } = props

    return (
        <nav className="Nav">
            <button name="pomodoro" value={pomodoroBtn} onClick={e => handleNavBtns(e)}>Pomodoro</button>
            <button name="short-break" value={shortBtn} onClick={e => handleNavBtns(e)}>Short Break</button>
            <button name="long-break" value={longBtn} onClick={e => handleNavBtns(e)}>Long Break</button>
        </nav>
    )
}
