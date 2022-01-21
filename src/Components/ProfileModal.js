import React, { useState, useEffect, useContext } from 'react'
import Modal from "react-modal"
import axios from "axios"
import { UserContext, ProPicContext } from '../Router'
import "./ProfileModal.scss"
import defaultProPic from "../Icons/default-profilepic.png"
import plus from "../Icons/plus.png"
import { storage } from '../base'
import { uploadBytes, ref, deleteObject } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid"

export default function ProfileModal() {
    const { profileModal, setProfileModal, payload, setPayload } = useContext(UserContext)
    const { setProfilePicId, setUploadedFlag, proPic } = useContext(ProPicContext)
    const [userName, setUserName] = useState("")
    const [profilePic, setProfilePic] = useState(null)


    useEffect(() => {
        setUserName(payload.username)
    }, [profileModal])


    const updateUser = async () => {

        setUploadedFlag(false)

        setProfileModal(false)

        deletePrevPic()

        setPayload({ ...payload, profilePicId: uuidv4() })

        const proPicRef = ref(storage, `proPics/${payload.profilePicId}`)

        setProfilePicId(payload.profilePicId)

        await axios.put("http://localhost:5000/update-user", { payload }).then(async res => {

            await uploadBytes(proPicRef, profilePic).
                catch(err => console.error(err.message))

            setUserName(res.data.username)
            setUploadedFlag(true)
        }).catch(err => console.error(err.message))

    }

    const deletePrevPic = async () => {

        await axios.post("http://localhost:5000/getPrevProPicId", { payload }).then(async res => {
            const prevProPicId = res.data.profilePicId

            const prevProPic = ref(storage, `proPics/${prevProPicId}`)

            await deleteObject(prevProPic)
                .catch(err => console.error(err.message))

        })

    }


    useEffect(() => {

        setPayload({ ...payload, username: userName })

    }, [userName])



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

                    <label className="propic-changer">

                        <img src={proPic ? proPic : defaultProPic} className="current-propic" />

                        <div className="plus-container">
                            <img src={plus} className='plus' />
                        </div>

                        <input
                            type="file"
                            accept='.jpg, .png'
                            onChange={e => setProfilePic(e.target.files[0])}
                        />
                    </label>

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
