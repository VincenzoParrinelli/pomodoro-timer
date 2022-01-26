import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    autoBreaks: localStorage.getItem("autoBreaks") === "true" || localStorage.getItem("autoBreaks") === true ? true : false,
    autoPomodoros: localStorage.getItem("autoPomodoros") === "true" || localStorage.getItem("autoPomodoros") === true ? true : false
}

export const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setAutoBreaks: state => {
            state.autoBreaks = !state.autoBreaks
        },

        setAutoPomodoros: state => {
            state.autoPomodoros = !state.autoPomodoros
        }
    }
})

export const {
    setAutoBreaks,
    setAutoPomodoros
} = SettingsSlice.actions

export default SettingsSlice.reducer


