import React, { useState, useEffect, useCallback } from 'react'
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import "./SettingsModal.scss"

import { setAutoBreaks, setAutoPomodoros } from "../Redux/SettingsSlice"

Modal.setAppElement("#root")

export default function SettingsModal(props) {

    const {
        settingsModal,
        setSettingsModal,
        timer,
        timer2,
        timer3,
        setTimer,
        setTimer2,
        setTimer3
    } = props


    const [userTimer, setUserTimer] = useState(localStorage.getItem("userTimer"))
    const [userTimer2, setUserTimer2] = useState(localStorage.getItem("userTimer2"))
    const [userTimer3, setUserTimer3] = useState(localStorage.getItem("userTimer3"))
    const { autoBreaks, autoPomodoros } = useSelector(state => state.settings)
    const dispatch = useDispatch()


    const setAuto = useCallback(node => {
        if (!node) return

        localStorage.setItem("autoBreaks", autoBreaks)
    }, [autoBreaks])

    const setAuto2 = useCallback(node => {
        if (!node) return

        localStorage.setItem("autoPomodoros", autoPomodoros)
    }, [autoPomodoros])



    const setUser = useCallback(node => {
        if (!node) return
        if (localStorage.getItem("userTimer") === userTimer) return

        let date = new Date()
        let date2 = ""

        date.setMinutes(userTimer)
        date.setSeconds(timer.substring(3, 5))

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
        date2 = minutes + ":" + seconds

        localStorage.setItem("userTimer", minutes)

        setTimer(date2)


    }, [settingsModal, userTimer])

    const setUser2 = useCallback(node => {
        if (!node) return
        if (localStorage.getItem("userTimer2") === userTimer2) return

        let date = new Date()
        let date2 = ""

        date.setMinutes(userTimer2)
        date.setSeconds(timer2.substring(3, 5))

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
        date2 = minutes + ":" + seconds

        localStorage.setItem("userTimer2", minutes)

        setTimer2(date2)


    }, [settingsModal, userTimer2])

    const setUser3 = useCallback(node => {
        if (!node) return
        if (localStorage.getItem("userTimer3") === userTimer3) return

        let date = new Date()
        let date2 = ""

        date.setMinutes(userTimer3)
        date.setSeconds(timer3.substring(3, 5))

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
        date2 = minutes + ":" + seconds

        localStorage.setItem("userTimer3", minutes)

        setTimer3(date2)

    }, [settingsModal, userTimer3])

    useEffect(() => {
        if (localStorage.getItem("userTimer") === userTimer) {

            setUserTimer(localStorage.getItem("userTimer"))

            if (timer.substring(0, 2) < "10" && userTimer) {

                let stringtoInt = parseInt(timer.substring(1, 2))

                localStorage.setItem("userTimer", stringtoInt)

                setUserTimer(localStorage.getItem("userTimer"))
            }
        }

        if (localStorage.getItem("userTimer2") === userTimer2) {

            setUserTimer2(localStorage.getItem("userTimer2"))

            if (timer2.substring(0, 2) < "10" && userTimer2) {

                let stringtoInt = parseInt(timer2.substring(1, 2))

                localStorage.setItem("userTimer2", stringtoInt)

                setUserTimer2(localStorage.getItem("userTimer2"))
            }
        }

        if (localStorage.getItem("userTimer3") === userTimer3) {

            setUserTimer3(localStorage.getItem("userTimer3"))

            if (timer3.substring(0, 2) < "10" && userTimer3) {

                let stringtoInt = parseInt(timer3.substring(1, 2))

                localStorage.setItem("userTimer3", stringtoInt)

                setUserTimer3(localStorage.getItem("userTimer3"))
            }
        }


    }, [settingsModal])

    return (
        <div>
            <Modal
                isOpen={settingsModal}
                onRequestClose={() => setSettingsModal(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)'
                        },

                        content: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "50vh",
                            height: "80vh",
                            transform: "translate(-50%, -50%)",
                            fontFamily: "arial",
                            borderRadius: "7px"
                        }
                    }
                }
            >
                <div className="top-container">
                    <p className="p1">TIMER SETTINGS</p>
                    <button className="closeBtn" onClick={() => setSettingsModal(false)}>X</button>
                </div>

                <hr className="separator"></hr>

                <div className="body-container">
                    <p className="p2">Time (minutes)</p>
                </div>

                <div className="body-container2">
                    <p className="p3" style={{ position: "relative", right: "30px" }}>Pomodoro</p>
                    <p className="p3" style={{ position: "relative", left: "-11px" }}>Short Break</p>
                    <p className="p3" style={{ position: "relative", left: "1px" }}>Long Break</p>
                </div>

                <div className="body-container3">
                    <input
                        ref={setUser}
                        value={userTimer ? userTimer : 25}
                        className="timeinput"
                        type="number"
                        min="0"
                        max="99"
                        onChange={e => setUserTimer(e.target.value)}
                    />

                    <input
                        ref={setUser2}
                        value={userTimer2 ? userTimer2 : 5}
                        className="timeinput"
                        type="number"
                        min="0"
                        max="99"
                        onChange={e => setUserTimer2(e.target.value)}
                    />

                    <input
                        ref={setUser3}
                        value={userTimer3 ? userTimer3 : 15}
                        className="timeinput"
                        type="number"
                        min="0"
                        max="99"
                        onChange={e => setUserTimer3(e.target.value)}
                    />
                </div>
                <hr className="separator" style={{ top: "14px" }}></hr>

                <div className="body-container">
                    <p className="p2" style={{ position: "relative", top: "50px" }}>Auto start Breaks?</p>

                    <label className="switch" >
                        <input
                            ref={setAuto}
                            checked={autoBreaks}
                            onChange={() => dispatch(setAutoBreaks())}
                            type="checkbox"
                        />

                        <span className="slider" />
                    </label>
                    
                </div>

                <hr className="separator" style={{ top: "78px" }}></hr>

                <div className="body-container">
                    <p className="p2" style={{ position: "relative", top: "120px" }}>Auto start Pomodoros?</p>

                    <label className="switch" style={{ top: "130px", left: "105px" }}>
                        <input
                            ref={setAuto2}
                            checked={autoPomodoros}
                            type="checkbox"
                            onChange={() => dispatch(setAutoPomodoros())}

                        />

                        <span className="slider" />
                    </label>

                </div>


            </Modal>
        </div>
    )
}

