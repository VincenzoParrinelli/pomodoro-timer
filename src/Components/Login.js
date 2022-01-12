import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.scss"
import { UserContext } from '../Router'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLogged, setIsLogged } = useContext(UserContext)
    const { payload, setPayload } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            navigate("/")
        }
    }, [isLogged])

    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/login", {
            email, password

        }).then((res) => {

            setIsLogged(res.data.isLogged)
            setPayload(res.data.payload)

        }).catch(err => console.error(err.message))
    }

    return (
        <div className="Login">
            <p>Login</p>
            <form className="login-form">
                <label>EMAIL</label>
                <input
                    type="email"
                    required
                    placeholder='example@mail.com'
                    onChange={e => setEmail(e.target.value)}
                />

                <label>PASSWORD</label>
                <input
                    type="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    className="submit-btn"
                    type="submit"
                    onClick={e => handleLogin(e)}

                >
                    Log in with Email
                </button>

            </form>

            <p>Do not have an account?</p>

            <Link to="/signup" className="create-account">Create account</Link>
        </div>
    )
}
