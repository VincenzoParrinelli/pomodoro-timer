import React, { useState, useEffect, useRef, useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './App.scss'
import Button from "./Components/Button"
import Display from "./Components/Display"
import Nav from "./Components/Nav"
import ProgressBar from "./Components/ProgressBar"
import ButtonSwitchSound from "./Sounds/multimedia_button_click_001.mp3"
import tomato from "./Icons/tomato.png"
import redtomato from "./Icons/red-tomato.png"
import lbluetomato from "./Icons/lblue-tomato.png"
import bluetomato from "./Icons/blue-tomato.png"
import forwardbtn from "./Icons/forward-btn.png"
import settings from "./Icons/settings.png"
import Tasks from "./Components/Tasks"
import SettingsModal from "./Components/SettingsModal"
import { UserContext } from "./Router"
import UserDropdown from "./Components/UserDropdown"


export const mainContext = React.createContext()

export default function App() {

  const [timer, setTimer] = useState("25:00")
  const [timer2, setTimer2] = useState("05:00")
  const [timer3, setTimer3] = useState("15:00")
  const [initialTimer, setInitialTimer] = useState("")
  const [buttonState, setButtonState] = useState(false)
  const [pomodoroBtn, setPomodoroBtn] = useState(true)
  const [shortBtn, setShortBtn] = useState(false)
  const [longBtn, setLongBtn] = useState(false)
  const [count, setCount] = useState(1)
  const [appState, setAppState] = useState("Time to focus!")
  const [settingsModal, setSettingsModal] = useState(false)
  const [flag, setFlag] = useState(false)
  const { autoBreaks, autoPomodoros } = useSelector(state => state.settings)
  const app = useRef(null)
  const nav = useRef(null)
  const forward = useRef(null)

  const navigate = useNavigate()

  const { isLogged } = useContext(UserContext)

  var stringtoInt = timer.split(":").join("").toString()
  var stringtoInt2 = timer2.split(":").join("").toString()
  var stringtoInt3 = timer3.split(":").join("").toString()


  useEffect(() => {

    if (!localStorage.getItem("count")) {
      localStorage.setItem("count", 1)
    }

    if (!localStorage.getItem("userTimer")) {
      localStorage.setItem("userTimer", "25")
    }

    if (!localStorage.getItem("userTimer2")) {
      localStorage.setItem("userTimer2", "05")
    }

    if (!localStorage.getItem("userTimer3")) {
      localStorage.setItem("userTimer3", "15")
    }

    let minutes = localStorage.getItem("userTimer")

    minutes = minutes.substring(0, 1) < "0" ? '0' + minutes : '' + minutes

    let resetSeconds = "00"

    setTimer(minutes + ":" + resetSeconds)
    setInitialTimer(minutes + ":" + resetSeconds)

  }, [])


  useEffect(() => {
    if (!stringtoInt || timer == "00:00") return

    if (buttonState && pomodoroBtn) {
      var interval = setInterval(() => {

        let date = new Date()
        let date2 = ""

        date.setMinutes(timer.substring(0, 2))
        date.setSeconds(timer.substring(3, 5) - 1)

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()

        date2 = minutes + ":" + seconds

        setTimer(date2)

        let favicon = document.getElementById("favicon")
        favicon.setAttribute("href", redtomato)
        document.title = `${timer} - ${appState}`

      }, 1000)
    }
    return () => clearInterval(interval)
  }, [buttonState, stringtoInt])

  useEffect(() => {
    if (!stringtoInt2 || timer2 == "00:00") return

    if (buttonState && shortBtn) {
      var interval = setInterval(() => {

        let date = new Date()
        let date2 = ""

        date.setMinutes(timer2.substring(0, 2))
        date.setSeconds(timer2.substring(3, 5) - 1)

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
        date2 = minutes + ":" + seconds

        setTimer2(date2)

        let favicon = document.getElementById("favicon")
        favicon.setAttribute("href", lbluetomato)
        document.title = `${timer2} - ${appState}`

      }, 1000)
    }

    return () => clearInterval(interval)
  }, [buttonState, stringtoInt2])

  useEffect(() => {
    if (!stringtoInt3 || timer3 == "00:00") return

    if (buttonState && longBtn) {
      var interval = setInterval(() => {

        let date = new Date()
        let date2 = ""

        date.setMinutes(timer3.substring(0, 2))
        date.setSeconds(timer3.substring(3, 5) - 1)

        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
        date2 = minutes + ":" + seconds

        setTimer3(date2)

        let favicon = document.getElementById("favicon")
        favicon.setAttribute("href", bluetomato)
        document.title = `${timer3} - ${appState}`

      }, 1000)
    }

    return () => clearInterval(interval)
  }, [buttonState, stringtoInt3])

  useEffect(() => {
    if (timer === "00:00" || timer2 === "00:00" || timer3 === "00:00") {
      handleTimerStates()
    }

  }, [timer, timer2, timer3])


  useEffect(() => {
    setFlag(false)

    if (pomodoroBtn) {
      setButtonState(false)
    }

    if (shortBtn && autoBreaks && !buttonState && !flag) {
      setTimer(initialTimer)
      setButtonState(true)
      forward.current.className = "forwardbtn on"
    }

    if (longBtn && autoBreaks && !buttonState && !flag) {
      setButtonState(true)
      forward.current.className = "forwardbtn on"
    }
  }, [shortBtn, longBtn, autoBreaks])

  useEffect(() => {
    setFlag(false)

    if (count === 1) return

    if (pomodoroBtn && autoPomodoros && !buttonState && !flag) {
      setButtonState(true)
      forward.current.className = "forwardbtn on"
    }
  }, [pomodoroBtn, autoPomodoros])


  const reset = (timerReset) => {
    setButtonState(false)

    if (timerReset === timer) {
      setTimer(formatTimer(timer))
    }

    if (timerReset === timer2) {
      setTimer2(formatTimer(timer2))
    }

    if (timerReset === timer3) {
      setTimer3(formatTimer(timer3))
    }

    forward.current.className = "forwardbtn hide"
  }

  const formatTimer = (timerToFormat) => {
    let date = new Date()
    let date2 = ""

    date.setMinutes(localStorage.getItem(
      timerToFormat === timer ? "userTimer"
        : timerToFormat === timer2 ? "userTimer2"
          : timerToFormat === timer3 ? "userTimer3" : "userTimer"
    ))

    date.setSeconds("00")

    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()

    date2 = minutes + ":" + "00"

    return date2
  }

  const handleButton = () => {
    !buttonState ? setButtonState(true) : setButtonState(false)
    if (!buttonState || buttonState) {
      const audio = new Audio()
      audio.src = ButtonSwitchSound
      audio.play()
    }
    !buttonState ? forward.current.className = "forwardbtn on" : forward.current.className = "forwardbtn off"
  }

  const handleForward = () => {
    if (window.confirm("Are you sure you want to finish this round?")) {
      reset()
      handleTimerStates()
    } else {
      setButtonState(false)
      forward.current.className = "forwardbtn hide"
    }

  }

  const handleTimerStates = () => {
    if (pomodoroBtn) {
      reset()
      setCount(count => count + 1)
      handleAppLblue()
      setAppState("Time for a break!")

      if (pomodoroBtn && count % 4 === 0) {
        reset()
        handleAppBlue()
        setAppState("Time for a break!")
      }
    } else if (shortBtn) {
      reset()
      handleAppRed()
      setAppState("Time to focus!")
    } else if (longBtn) {
      reset()
      handleAppRed()
      setAppState("Time to focus!")
    }
  }

  const handleNavBtns = (e) => {
    if (!e.target.value) return

    setFlag(true)

    if (e.target.name === "pomodoro" && pomodoroBtn === false) {
      handleAppRed()

    } else if (e.target.name === "short-break" && shortBtn === false) {
      handleAppLblue()

    } else if (e.target.name === "long-break" && longBtn === false) {
      handleAppBlue()

    }
  }

  const handleAppRed = () => {
    setPomodoroBtn(true)
    setShortBtn(false)
    setLongBtn(false)
    reset(timer)
    setAppState("Time to focus!")

    let favicon = document.getElementById("favicon")
    favicon.setAttribute("href", redtomato)

    document.title = `${timer} - Time to focus!`
    document.body.className = "red"

    app.current.className = "App red"
    nav.current.className = "nav red"
  }

  const handleAppLblue = () => {
    setShortBtn(true)
    setPomodoroBtn(false)
    setLongBtn(false)
    reset(timer2)

    setAppState("Time for a break!")

    let favicon = document.getElementById("favicon")
    favicon.setAttribute("href", lbluetomato)

    document.title = `${timer2} - Time for a break!`
    document.body.className = "lblue"

    app.current.className = "App lblue"
    nav.current.className = "nav lblue"
  }

  const handleAppBlue = () => {
    setLongBtn(true)
    setPomodoroBtn(false)
    setShortBtn(false)
    reset(timer3)

    setAppState("Time for a break!")

    let favicon = document.getElementById("favicon")
    favicon.setAttribute("href", bluetomato)

    document.title = `${timer3} - Time for a break!`
    document.body.className = "blue"

    app.current.className = "App blue"
    nav.current.className = "nav blue"
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={tomato} className="tomato" /> PomodoroClock
        </div>

        <button className="settings"
          name={
            pomodoroBtn ? "pomodoroBtn" :
              shortBtn ? "shortBtn" :
                longBtn ? "longBtn" : "pomodoroBtn"
          }
          onClick={() => setSettingsModal(true)}>
          <img src={settings} className="gear" />
          <p> Settings </p>
        </button>

        {settingsModal &&
          <SettingsModal
            settingsModal={settingsModal}
            setSettingsModal={setSettingsModal}
            timer={timer}
            timer2={timer2}
            timer3={timer3}
            setTimer={setTimer}
            setTimer2={setTimer2}
            setTimer3={setTimer3}
          />
        }

        {!isLogged ? (
          <button
            className="settings"
            style={{ right: "435px" }}
            name={
              pomodoroBtn ? "pomodoroBtn" :
                shortBtn ? "shortBtn" :
                  longBtn ? "longBtn" : "pomodoroBtn"
            }

            onClick={() => navigate("/login")}
          >
            Login

          </button>
        )
          :
          (
            <UserDropdown />
          )}


      </header>
      <br />
      <ProgressBar
        pomodoroBtn={pomodoroBtn}
        shortBtn={shortBtn}
        longBtn={longBtn}
        stringtoInt={stringtoInt}
        stringtoInt2={stringtoInt2}
        stringtoInt3={stringtoInt3}
        buttonState={buttonState}

      />

      <div ref={app} className="App">
        <div ref={nav} className="nav">
          <Nav
            pomodoroBtn={pomodoroBtn}
            shortBtn={shortBtn}
            longBtn={longBtn}
            handleNavBtns={handleNavBtns}
          />
        </div>

        <Display
          timer={timer}
          timer2={timer2}
          timer3={timer3}
          setPomodoroBtn={setPomodoroBtn}
          shortBtn={shortBtn}
          longBtn={longBtn}
        />

        <Button
          pomodoroBtn={pomodoroBtn}
          shortBtn={shortBtn}
          longBtn={longBtn}
          buttonState={buttonState}
          handleButton={handleButton}
        />

        <img onClick={handleForward}
          ref={forward}
          className="forwardbtn"
          src={forwardbtn}
        />

      </div>

      <div className="count">#{count}</div>
      <div className="appstate">{appState}</div>

      <div className="tasks">
        <mainContext.Provider value={{ stringtoInt, pomodoroBtn, shortBtn, longBtn }}>
          <Tasks
            pomodoroBtn={pomodoroBtn}
            shortBtn={shortBtn}
            longBtn={longBtn}
            appState={appState}
            setAppState={setAppState}
            count={count}
          />
        </mainContext.Provider>
      </div>

      <div className="infos">

      </div>

    </>
  )
}


