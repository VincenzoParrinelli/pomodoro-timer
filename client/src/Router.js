import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import EmailSent from './Components/EmailSent'
import NewPassword from './Components/NewPassword'
import ResetPassword from './Components/ResetPassword'

export const UserContext = createContext(null)
export const ProPicContext = createContext(null)

export default function Router() {
    const [isLogged, setIsLogged] = useState(false)
    const [payload, setPayload] = useState({})
    const [profilePicId, setProfilePicId] = useState(null)
    const [uploadedFlag, setUploadedFlag] = useState(false)
    const [proPic, setProPic] = useState(null)


    return (
        <BrowserRouter>
            <UserContext.Provider value={{ isLogged, setIsLogged, payload, setPayload }}>
                <ProPicContext.Provider
                    value={
                        {
                            profilePicId,
                            setProfilePicId,
                            uploadedFlag,
                            setUploadedFlag,
                            proPic, 
                            setProPic,
                        }
                    }
                >
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/email_sent" element={<EmailSent />} />
                        <Route path="/new_password/:token" element={<NewPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />

                    </Routes>
                </ProPicContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

