import React from 'react'
import { Link } from "react-router-dom"
import "./Login.scss"

export default function Login() {
    return (
        <div className="Login">
            <p>Login</p>
            <form className="login-form">
                <label>EMAIL</label>
                <input type="email" required placeholder='example@mail.com'/>

                <label>PASSWORD</label>
                <input type="password" required />

                <button className="submit-btn" type="submit">Log in with Email</button>

            </form>

            <p>Do not have an account?</p>

            <Link to="/signup" className="create-account">Create account</Link>
        </div>
    )
}
