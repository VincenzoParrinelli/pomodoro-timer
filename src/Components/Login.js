import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../Icons/logo.png"
import "./Login.scss"
import { UserContext } from '../Router'
import { app } from "../base"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState({ email: true, password: true })
    const { isLogged, setIsLogged } = useContext(UserContext)
    const { setPayload } = useContext(UserContext)

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

            setPayload(res.data.payload)
            setIsValid(res.data.isValid)
            
            const auth = getAuth(app)
            
            signInWithEmailAndPassword(auth, res.data.payload.email, res.data.payload.password).then(() => {
                setIsLogged(res.data.isLogged)
                
            })
            .catch(err => console.error(err.message))
            
        }).catch(err => console.error(err.message))
    }

    return (
        <div className="Login">
            <Link to="/"><img src={logo} className="logo" /></Link>

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

                {!isValid.email && (
                    <div className="isvalid">
                        Please input valid email
                    </div>
                )}

                {!isValid.password && (
                    <div className="isvalid">
                        Please input valid password
                    </div>
                )}



                <button
                    className="submit-btn"
                    type="submit"
                    onClick={e => handleLogin(e)}

                >
                    Log in with Email
                </button>

            </form>

            <p>Do not have an account?</p>

            <button> <Link to="/signup" className="create-account">Create account</Link> </button>
        </div>
    )
}
