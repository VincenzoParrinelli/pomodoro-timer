import React from 'react'
import axios from 'axios'
import "./NewPassword.scss"

export default function NewPassword() {

    const submitPassword = async e => {
        e.preventDefault()

        await axios.post("https://pomodoroclock.herokuapp.com/", {

        })
    }

    return (
        <div>
            <div className="NewPassword">
                <p>Set New Password</p>
                <form className="password-form">
                    <label>PASSWORD</label>
                    <input type="password" required />

                    <label>PASSWORD (CONFIRM)</label>
                    <input type="password" required />

                    <button
                        className="submit-btn"
                        type="submit"
                        onClick={e => submitPassword(e)}
                    >
                        Set Password
                    </button>

                </form>

            </div>
        </div>
    )
}

