import React, { useState, useEffect } from 'react'
import axios from "axios"
import logo from "../Icons/logo.png"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.scss"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isPresent, setIsPresent] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (emailSent) {
            navigate("/email_sent")
        }
    }, [emailSent])

    const submitEmail = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:5000/send_email", {
            email

        }).then((res) => {
            setIsValid(res.data.isValid)
            setEmailSent(res.data.emailSent)
            setIsPresent(res.data.isPresent)
            
        }).catch(err => console.error(err.message))

    }

    return (
        <div className="Signup">
            <Link to="/"><img src={logo} className="logo" /></Link>

            <p>Create Account</p>

            <form className="signup-form">
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

                {isPresent && (
                    <div className="isvalid-email">
                        Email exists already
                    </div>
                )}


                <button
                    className="submit-btn"
                    type="submit"
                    onClick={e => submitEmail(e)}
                >
                    Sign up with Email
                </button>

            </form>

            <p>Already have an account?</p>

            <button> <Link to="/login" className="log-in">Log In</Link> </button>
        </div>
    )
}
