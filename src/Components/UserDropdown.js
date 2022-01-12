import React, { useState, useRef, useEffect, useContext } from 'react'
import ProfileModal from "./ProfileModal"
import defaultProPic from "../Icons/default-profilepic.png"
import user from "../Icons/user.png"
import logoutBlack from "../Icons/logout-black.png"
import bin from "../Icons/bin.png"
import "./UserDropdown.scss"
import { UserContext } from '../Router'
import axios from "axios"

export default function UserDropdown() {
    const [userDropdown, setUserDropdown] = useState(false)
    const [profileModal, setProfileModal] = useState(false)
    const body = useRef(null)

    const { setIsLogged, payload, setPayload } = useContext(UserContext)

    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            if (body.current && !body.current.contains(e.target)) {
                setUserDropdown(false)
            }
        })

        return () => {
            document.addEventListener("mousedown", (e) => {
                if (body.current && !body.current.contains(e.target)) {
                    setUserDropdown(false)
                }
            })
        }
    }, [body])

    const handleProfile = () => {
        setProfileModal(!profileModal)
        setUserDropdown(false)
    }

    const Logout = () => {
        setIsLogged(false)
        setPayload(null)
        setUserDropdown(false)
    }

    const deleteAccount = async () => {
        setUserDropdown(false)

        if (window.confirm("Are you sure you want to delete your account? This operation can not be undone.")) {
            await axios.delete("http://localhost:5000/delete-user", {
                payload
            }).then((res) => {
                if (res.data.isDeleted !== 0) {
                    setPayload(null)
                    setIsLogged(false)
                }
            }).catch(err => console.error(err.message))
        }
    }

    return (
        <div ref={body}>
            <img
                className="default-propic"
                src={defaultProPic}
                onClick={() => setUserDropdown(!userDropdown)}
            />

            {userDropdown && (
                <div className="userDropdown">
                    <div className="functions-container">
                        <div className="functions" onClick={() => handleProfile()}>
                            <img src={user} /> Profile
                        </div>
                    </div>

                    <div className="functions-container" onClick={() => Logout()}>
                        <div className="functions">
                            <img src={logoutBlack} /> Logout
                        </div>
                    </div>

                    <div className="functions-container">
                        <div className="functions" onClick={() => deleteAccount()}>
                            <img src={bin} /> Delete Account
                        </div>
                    </div>
                </div>
            )}

            <UserContext.Provider value={{ profileModal, setProfileModal, payload, setPayload }}>
                {profileModal && (
                    <ProfileModal />
                )}
            </UserContext.Provider>
        </div>
    )
}
