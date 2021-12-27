import React from 'react'
import whiteTomato from "../Icons/white-tomato.png"
import "./test.scss"

export default function test() {
    return (
        <div className="test">

            <div className="logo-container">
                <img className="white-tomato" src={whiteTomato} />
                <p>PomodoroClock</p>
            </div>


            <hr />
            <h2>Please set a new password for your account.</h2>
            <p>Please set a new password for your account.</p>

            <div className="btn-container">
                <button className="set-password">Set a New Password</button>
            </div>

            <p className="footer">
                This email was sent by PomodoroClock <a href="http://localhost:3000">
                    (https://localhost:3000)
                </a>
            </p>
        </div>
    )
}
