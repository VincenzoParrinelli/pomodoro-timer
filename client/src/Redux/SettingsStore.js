import { configureStore } from "@reduxjs/toolkit"
import settingsReducer from "./SettingsSlice"


const SettingsStore = configureStore({
    reducer: {
        settings: settingsReducer,
    }
})


export default SettingsStore
