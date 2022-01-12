import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Test from "./Components/test"
import EmailSent from './Components/EmailSent'
import NewPassword from './Components/NewPassword'

export const UserContext = createContext(null)

export default function Router() {
    const [isLogged, setIsLogged] = useState(false)
    const [payload, setPayload] = useState(null)


    return (
        <BrowserRouter>
            <UserContext.Provider value={{ isLogged, setIsLogged, payload, setPayload }}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/email_sent" element={<EmailSent />} />
                    <Route path="/new_password/:token" element={<NewPassword />} />

                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

