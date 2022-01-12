import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./NewPassword.scss"

export default function NewPassword() {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isCreated, setIsCreated] = useState(false)
    const [isEqual, setIsEqual] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (isCreated) {

            if (window.confirm("New password has been set!")) {
                navigate("/login")
            } else {
                navigate("/login")
            }
        }

    }, [isCreated])

    const handlePasswords = e => {
        e.preventDefault()

        if (password === password2) {
            submitPassword()
            setIsEqual(true)

        } else if (!isValid) {
            setIsEqual(true)
        } else {
            setIsEqual(false)
        }

    }

    const submitPassword = async () => {

        await axios.post("http://localhost:5000/new_password/:token", {
            password,
            token: location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        }).then((res) => {
            setIsValid(res.data.isValid)
            setIsCreated(res.data.isCreated)


        }).catch(err => console.error(err.message))
    }

    return (
        <div>
            <div className="NewPassword">
                <p>Set New Password</p>
                <form className="password-form">
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        required
                        onChange={e => setPassword(e.target.value)}

                    />

                    <label>PASSWORD (CONFIRM)</label>
                    <input
                        type="password"
                        required
                        onChange={e => setPassword2(e.target.value)}
                    />

                    {!isValid && (
                        <div className="isvalid-password">
                            Please input valid password
                        </div>
                    )}

                    {!isEqual && (
                        <div className="isvalid-password">
                            Passwords do not match
                        </div>
                    )}


                    <button
                        className="submit-btn"
                        type="submit"
                        onClick={e => handlePasswords(e)}
                    >
                        Set Password
                    </button>

                </form>

            </div>
        </div>
    )
}

