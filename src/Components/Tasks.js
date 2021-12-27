import React, { useState, useRef, useEffect, useCallback } from 'react'
import Dropdown from './Dropdown'
import "./Tasks.scss"
import check from "../Icons/check.png"
import listellipsis from "../Icons/listellipsis.png"
import arrowdown from "../Icons/arrow-down.png"
import arrowup from "../Icons/arrow-up.png"
import ListDisplay from './ListDisplay'

export default function Tasks(props) {

    const {
        pomodoroBtn,
        shortBtn,
        longBtn,
        setAppState,
        count
    } = props


    const [newTask, setNewTask] = useState(false)
    const [estPomodoros, setEstPomodoros] = useState(1)
    const [estTotal, setEstTotal] = useState(0)
    const [actsArr, setActsArr] = useState([])
    const [actTotal, setActTotal] = useState([])
    const [pomodorosArr, setPomodorosArr] = useState([])
    const [saveBtn, setSaveBtn] = useState(true)
    const [list, setList] = useState([])
    const [newList, setNewList] = useState([])
    const [textAreaValue, setTextAreaValue] = useState(null)
    const [listEllipsis, setListEllipsis] = useState(false)
    const [currentI, setCurrentI] = useState()
    const [currentI2, setCurrentI2] = useState()
    const menu = useRef(null)
    const newTextarea = useRef(null)
    const editTextarea = useRef(null)
    const listRef = useRef(null)
    const checkRef = useRef(null)
    const updatingList = useRef(null)
    const editRef = useRef(null)

    const setlistRef2 = useCallback(node => {

        if (!node) return

        if (node.innerText.length >= 265) {
            node.style.height = "200px"
        } else if (node.innerText.length >= 187) {
            node.style.height = "100px"
        } else if (node.innerText.length >= 94) {
            node.style.height = "50px"
        }

        if (!updatingList.current) return

        if (updatingList.current.style.height === "50px") {
            updatingList.current.style.height = "240px"

        } else if (updatingList.current.style.height === "100px") {
            updatingList.current.style.height = "240px"

        } else if (updatingList.current.style.height === "200px") {
            updatingList.current.style.height = "240px"
        }


    }, [list, listEllipsis])

    useEffect(() => {

        document.addEventListener("mousedown", (e) => {
            if (menu.current && !menu.current.contains(e.target)) {
                setNewTask(false)
            }
        })

        return () => {
            document.removeEventListener("mousedown", (e) => {
                if (menu.current && !menu.current.contains(e.target)) {
                    setNewTask(false)
                }
            })
        }
    }, [menu])

    useEffect(() => {

        document.addEventListener("mousedown", (e) => {

            if (updatingList.current && e.target.className === "listellipsis") {
                setListEllipsis(true)
            }

            else if (updatingList.current && !updatingList.current.contains(e.target)) {
                setListEllipsis(false)
            }

        })

        return () => {
            document.removeEventListener("mousedown", (e) => {
                if (updatingList.current && !updatingList.current.contains(e.target)) {
                    setListEllipsis(false)
                }
            })
        }
    }, [updatingList])


    useEffect(() => {
        if (list.length === 1) {
            document.getElementById("listId").click()
        } return
    }, [list])

    useEffect(() => {
        if (listEllipsis) {
            if (currentI < 3) {
                document.getElementById("id").scrollIntoView()
                window.scrollTo(0, 400)
                
            } else {
                document.getElementById("id").scrollIntoView()
                window.scrollTo(0, 120 * currentI + 1)
             
            }
        }

    }, [listEllipsis])

    useEffect(() => {
        if (pomodorosArr.length >= 1) {
            let reducer = (prevValue, currentValue) => prevValue + currentValue
            setEstTotal(pomodorosArr.reduce(reducer))
            setActTotal(actsArr.reduce(reducer))
        } return

    }, [shortBtn, longBtn, actsArr, pomodorosArr])

    useEffect(() => {
        let copyArr = [...actsArr]
        copyArr[currentI]++
        setActsArr(copyArr)
    }, [count])

    const handleTextArea = (e) => {
        if (e.target.value) {
            setSaveBtn(false)
        } else {
            setSaveBtn(true)
        }

        setTextAreaValue(e.target.value)
    }

    const handleSave = () => {
        if (newTextarea.current) {
            newTextarea.current.value = null
            setSaveBtn(true)
            newTextarea.current.focus()
            setTextAreaValue(null)
            addToList()

        } else if (editTextarea.current) {
            editTextarea.current.value = null
            setSaveBtn(true)
            setTextAreaValue(null)
            editList()
        }
        setListEllipsis(false)
    }

    const addToList = () => {
        setList([...list, textAreaValue])
        setPomodorosArr([...pomodorosArr, estPomodoros])
        setActsArr([...actsArr, 0])
        setEstPomodoros(1)
    }


    const editList = () => {
        list[currentI] = textAreaValue
        let prevPomo = pomodorosArr[currentI]
        pomodorosArr[currentI] = estPomodoros
        let difference = prevPomo - pomodorosArr[currentI]
        setEstTotal(estTotal - difference)

        setEstPomodoros(1)
    }


    const handleTask = (i, e) => {

        if (e.target.className !== "taskslist") return

        if (typeof list[i] === "object") {
            setAppState(list[i].props.children)

        } else setAppState(list[i])
        
        setCurrentI(i)
        setCurrentI2(i)

    }

    const handleCheck = (i) => {

        if (typeof list[i] === 'object') {
            let string = typeof list[i] === 'object' ? list[i].props.children : list[i]
            list[i] = string
            setEstTotal(estTotal + pomodorosArr[i])

        } else {
            let string = list[i]
            list[i] = (<del>{string}</del>)
            setEstTotal(estTotal - pomodorosArr[i])

        }

    }


    const modifyList = (i) => {
        setListEllipsis(true)
        
        setCurrentI(i)

        setNewList([...list])

    }

    const deleteTask = (i) => {
        pomodorosArr.splice(i, 1)
        actsArr.splice(i, 1)
        list.splice(i, 1)
        setListEllipsis(false)
    }

    return (
        <div className="Tasks">
            <p className="tasks">Tasks</p>

            <Dropdown
                setList={setList}
                list={list}
                setEstTotal={setEstTotal}
                setActTotal={setActTotal}
            />

            <div className="breakline">
                <hr />
            </div>

            {!listEllipsis && (
                <div>
                    {list.map((task, i) => (
                        <div ref={listRef} ref={setlistRef2} id="listId"
                            key={i}
                            className={currentI2 === i ? "taskslistactive" : "taskslist"}
                            onClick={(e) => handleTask(i, e)}>

                            <input 
                                ref={checkRef}
                                type="checkbox"
                                id={"checkbox" + i}

                                onClick={() => handleCheck(i)}
                            />

                            <label htmlFor={"checkbox" + i}/>


                            <div className="currenttask">
                                {task}
                            </div>

                            <div className="estpomodoros">
                                {actsArr[i]}
                            </div>


                            <div className="estpomodoros">
                                /{pomodorosArr[i]}
                            </div>


                            <img
                                src={listellipsis}
                                className="listellipsis"
                                onClick={() => modifyList(i)}
                            />

                        </div>

                    ))}
                </div>
            )}

            {listEllipsis && (
                newList.map((task, i) => (
                    <div key={i} id={"id"}
                        ref={editRef}
                        className={currentI === i ? "editTask" : "newtaskslist"}>
                        {currentI === i ?
                            <div ref={updatingList}>
                                <ul>
                                    <textarea
                                        ref={editTextarea}
                                        autoFocus
                                        placeholder={typeof task === 'object' ? task.props.children : task}
                                        onChange={(e) => handleTextArea(e)}
                                    />

                                    <p>Est Pomodoros</p>

                                    <input
                                        value={estPomodoros}
                                        type="number"
                                        min="0"
                                        max="9999"
                                        onChange={(e) => setEstPomodoros(e.target.value)}
                                    />

                                    <button className="estpomodorosbtns"
                                        onClick={() => setEstPomodoros(estPomodoros + 1)}>
                                        <img src={arrowup} />
                                    </button>

                                    <button className="estpomodorosbtns"
                                        onClick={() => setEstPomodoros(estPomodoros === 0 ? 0 : estPomodoros - 1)}>
                                        <img src={arrowdown} />
                                    </button>

                                </ul>
                                <footer>
                                    <button className="delete"
                                        onClick={() => deleteTask(i)}>Delete</button>

                                    <button className="cancel"
                                        onClick={() => setListEllipsis(false)}>Cancel</button>
                                    <button
                                        disabled={saveBtn}
                                        className="save"
                                        id="save"
                                        onClick={() => handleSave()}

                                    > Save
                                    </button>
                                </footer>
                            </div>
                            :
                            <div className="taskslist2" ref={setlistRef2}>
                                <img src={check} className="check" />

                                <div className="currenttask" >
                                    {task}
                                </div>

                                <div className="estpomodoros">
                                    {actsArr[i]}
                                </div>


                                <div className="estpomodoros">
                                    /{pomodorosArr[i]}
                                </div>


                                <img
                                    src={listellipsis}
                                    className="listellipsis"
                                    onClick={() => modifyList(i)}
                                />

                            </div>

                        }

                    </div>

                )
                ))}




            {!newTask && <button
                onClick={!newTask ? () => setNewTask(true) : () => setNewTask(false)}
                name={pomodoroBtn ? "pomodoroBtn" :
                    shortBtn ? "shortBtn" :
                        longBtn ? "longBtn" : "pomodoroBtn"}
                className="taskBtn" > + Add Task
            </button>}

            {newTask && (
                <div className="newtask" ref={menu}>
                    <ul>
                        <textarea
                            autoFocus
                            ref={newTextarea}
                            placeholder="What are you working on?"
                            onChange={(e) => handleTextArea(e)}
                        />

                        <p>Est Pomodoros</p>

                        <input
                            value={estPomodoros}
                            type="number"
                            min="0"
                            max="9999"
                            onChange={(e) => setEstPomodoros(e.target.value)}
                        >
                        </input>

                        <button className="estpomodorosbtns"
                            onClick={() => setEstPomodoros(estPomodoros + 1)}>
                            <img src={arrowup} />
                        </button>

                        <button className="estpomodorosbtns"
                            onClick={() => setEstPomodoros(estPomodoros === 0 ? 0 : estPomodoros - 1)}>
                            <img src={arrowdown} />
                        </button>

                    </ul>
                    <footer>
                        <button className="cancel" onClick={() => setNewTask(false)}>Cancel</button>
                        <button
                            disabled={saveBtn}
                            className="save"
                            id="save"
                            onClick={() => handleSave()}

                        > Save
                        </button>
                    </footer>
                </div>
            )}

            {list.length >= 1 &&
                <ListDisplay
                    estTotal={estTotal}
                    actTotal={actTotal}
                />
            }

        </div>

    )
}
