import React, { useState, useEffect, useContext, useRef } from 'react'
import Modal from "react-modal"
import axios from "axios"
import { UserContext } from '../Router'
import "./ProfileModal.scss"

export default function ProfileModal() {
    const { profileModal, setProfileModal, payload, setPayload } = useContext(UserContext)
    const [userName, setUserName] = useState(payload.username)
    const [prevPayload, setPrevPayload] = useState({})
    const [profilePic, setProfilePic] = useState(null)
    const [prevFormData, setPrevFormData] = useState(null)
    const [formData, setFormData] = useState(null)


    useEffect(() => {
        setUserName(payload.username)
    }, [profileModal])

    const updateUser = async () => {
        setProfileModal(false)


        //console.log(formData.get("image").name)
        //console.log(prevFormData.get("image").name)


        // if (prevPayload.username === payload.username) return
        // if (prevFormData.get("image") === formData.get("image")) return


        await axios.delete("http://localhost:5000/delete-profilePic",
            payload
        ).then(async (res) => {
            setUserName(res.data.username)

        }).catch(err => console.error(err.message))


        await axios.put("http://localhost:5000/update-user",
            formData,
        ).then((res) => {

        }).catch(err => console.error(err.message))
    }

    useEffect(() => {
        if (payload.username) {
            setPrevPayload({ ...payload })
        }
    }, [userName])


    /*useEffect(() => {
        if (formData) {
            setPrevFormData(formData)
        }
    }, [formData])*/


    useEffect(() => {
        var subscribeToApi = true

        if (subscribeToApi) {

            if (profilePic) {
                var formData = new FormData()

                formData.append("image", profilePic, profilePic.name)
                formData.append("id", payload._id)
                formData.append("username", userName)

                setPrevFormData(formData)
                setFormData(formData)

            }

            setPayload({ ...payload, username: userName ? userName : payload.username })

        }

        return () => {
            subscribeToApi = false
        }
    }, [userName, profilePic])


    return (
        <div>
            <Modal
                isOpen={profileModal}
                onRequestClose={() => setProfileModal(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)'
                        },

                        content: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "70vh",
                            height: "31vh",
                            transform: "translate(-50%, -50%)",
                            fontFamily: "arial",
                            borderRadius: "7px",
                            padding: 0
                        }
                    }
                }
            >
                <div className="profile-container">
                    <p>PROFILE</p>
                    <button className="closeBtn2" onClick={() => setProfileModal(false)}>X</button>

                    <input
                        type="file"
                        accept='.jpg, .png'
                        onChange={e => setProfilePic(e.target.files[0])}
                    />

                    <textarea
                        style={{ textDecoration: "none" }}
                        className="username"
                        placeholder="Type your name here"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    >

                    </textarea>

                    <footer>
                        <button className="cancel" onClick={() => setProfileModal(false)}>Cancel</button>
                        <button
                            className="save"
                            onClick={() => updateUser()}
                            disabled={!userName}
                        > Save
                        </button>
                    </footer>
                </div>

            </Modal>
        </div>
    )
}
