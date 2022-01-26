import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import logo from "../Icons/logo.png"
import { Link, useNavigate } from "react-router-dom"
import "./ResetPassword.scss"


export default function ResetPassword() {
    const [email, setEmail] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isPresent, setIsPresent] = useState(true)
    const [emailSent, setEmailSent] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (emailSent) {
            navigate("/email_sent")
        }
    }, [emailSent])


    const resetPassword = async e => {
        e.preventDefault()

        await axios.post("http://localhost:5000/reset-password", {
            email
        }).then(async res => {

            setIsValid(res.data.isValid)
            setIsPresent(res.data.isPresent)

            if (isValid && isPresent) {
                await axios.post("http://localhost:5000/send-reset-email", {
                    email
                }).then(res => {

                    setEmailSent(res.data.emailSent)
                    setIsValid(res.data.isValid)
                    setIsPresent(res.data.isPresent)

                }).catch(err => console.error(err.message))
            }

        }).catch(err => console.error(err.message))
    }

    return (
        <div className="ResetPassword">
            <Link to="/"><img src={logo} className="logo" /></Link>

            <p>Reset Password</p>

            <form className="email-form">
                <label>EMAIL</label>
                <input
                    type="email"
                    placeholder='example@mail.com'
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                {!isValid && (
                    <div className="isvalid-email">
                        Please input valid email
                    </div>
                )}

                {!isPresent && (
                    <div className="isvalid-email">
                        Email Doesn't Exist
                    </div>
                )}

                <button
                    className="submit-btn"
                    type="submit"
                    onClick={e => resetPassword(e)}
                >
                    Reset Password
                </button>

            </form>

            <button> <Link to="/login" className="log-in">Log In</Link> </button>
        </div>
    )
}
